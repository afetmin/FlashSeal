<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import Header from "./components/Header.svelte";
  import CreatePanel from "./components/CreatePanel.svelte";
  import OpenPanel from "./components/OpenPanel.svelte";
  import Features from "./components/Features.svelte";
  import AppFooter from "./components/AppFooter.svelte";
  import { DEFAULT_LANGUAGE, languageOrder, translations, type LanguageCode, type Translation } from "./lib/translations";
  import { HOME_URL, MAX_IMAGE_BYTES, SECRET_ID_LENGTH, VIEW_DURATION_SECONDS, base64UrlDecode, base64UrlEncode, extractImageFile, formatBytes, loadLanguage, parseSecretUrl, randomId, readJsonResponse, resolveInitialMode, type Mode, type SecretKind } from "./lib/core";
  import { syncMeta } from "./lib/meta";
  import { asStatusMessageKey, mapServerError, resolveStatusMessage, type StatusMessageKey, type StatusState } from "./lib/status";
  import { UNLOCK_DELAY_OPTIONS, formatSecretLockedMessage, type UnlockDelayMinutes } from "./lib/unlock";

  type CreateResponse = { code?: string };
  type OpenResponse = { code?: string; iv: string; ciphertext: string; kind: SecretKind; mimeType?: string; unlockAt?: number; now?: number };

  let language: LanguageCode = DEFAULT_LANGUAGE;
  let mode: Mode = "create";
  let kind: SecretKind = "text";
  let unlockDelayMinutes: UnlockDelayMinutes = 0;
  let menuOpen = false;
  let textValue = "";
  let selectedImage: File | null = null;
  let imagePreviewUrl = "";
  let imageName = "image.png";
  let imageSize = "0 MB";
  let resultLink = "";
  let openValue = "";
  let openLocked = false;
  let countdown = VIEW_DURATION_SECONDS;
  let viewerVisible = false;
  let viewerText = "";
  let viewerImageUrl = "";
  let createStatus: StatusState = { kind: "" };
  let openStatus: StatusState = { kind: "" };
  let fileInput: HTMLInputElement | undefined;
  let languageButton: HTMLButtonElement | undefined;
  let languageMenu: HTMLDivElement | undefined;
  let countdownTimer: number | undefined;

  $: copy = (translations[language] || translations[DEFAULT_LANGUAGE]) as Translation;
  $: syncMeta({ ...copy, lang: language });
  $: document.documentElement.lang = language;

  onMount(() => {
    language = loadLanguage();
    mode = resolveInitialMode();
    syncFromLocation();
    registerServiceWorker();
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("paste", handleCreatePaste);
    window.addEventListener("hashchange", syncFromLocation);
    window.addEventListener("popstate", syncFromLocation);
  });

  afterUpdate(() => window.lucide?.createIcons());

  onDestroy(() => {
    stopBurnCountdown();
    releaseImagePreview();
    releaseViewerImage();
    document.removeEventListener("click", handleDocumentClick);
    document.removeEventListener("paste", handleCreatePaste);
    window.removeEventListener("hashchange", syncFromLocation);
    window.removeEventListener("popstate", syncFromLocation);
  });

  function handleDocumentClick(event: MouseEvent) {
    if (!menuOpen || languageMenu?.contains(event.target) || languageButton?.contains(event.target)) return;
    menuOpen = false;
  }

  function setStatus(scope: "create" | "open", messageKey?: StatusMessageKey, kindValue: StatusState["kind"] = "", message = ""): void {
    const nextStatus = { kind: kindValue, message, messageKey };
    if (scope === "create") createStatus = nextStatus;
    else openStatus = nextStatus;
  }

  function setLanguage(nextLanguage: LanguageCode): void {
    language = nextLanguage;
    localStorage.setItem("flashseal-language", nextLanguage);
    menuOpen = false;
  }

  function resetViewer() {
    stopBurnCountdown();
    viewerVisible = false;
    viewerText = "";
    releaseViewerImage();
  }

  async function createSecret() {
    setStatus("create");
    resultLink = "";
    const secretPayload = await buildSecretPayload();
    if (!secretPayload) return;
    try {
      setStatus("create", "creating");
      const id = randomId(SECRET_ID_LENGTH);
      const keyBytes = crypto.getRandomValues(new Uint8Array(32));
      const ivBytes = crypto.getRandomValues(new Uint8Array(12));
      const cryptoKey = await crypto.subtle.importKey("raw", keyBytes, "AES-GCM", false, ["encrypt"]);
      const encryptedBytes = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, cryptoKey, secretPayload.bytes);
      const body = JSON.stringify({ id, kind: secretPayload.kind, mimeType: secretPayload.mimeType, unlockDelayMinutes, iv: base64UrlEncode(ivBytes), ciphertext: base64UrlEncode(new Uint8Array(encryptedBytes)) });
      const response = await fetch(`/api/secrets?lang=${language}`, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      const result = await response.json() as CreateResponse;
      if (!response.ok) throw new Error(mapServerError(result?.code, "create"));
      resultLink = `${window.location.origin}/s/${id}#k=${base64UrlEncode(keyBytes)}`;
      setStatus("create", "created", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      const messageKey = asStatusMessageKey(errorMessage);
      setStatus("create", messageKey, "error", messageKey ? "" : errorMessage);
    }
  }

  async function buildSecretPayload() {
    if (kind === "text") {
      const value = textValue.trim();
      if (!value) return setStatus("create", "emptyText", "error"), null;
      return { kind: "text", mimeType: "text/plain;charset=utf-8", bytes: new TextEncoder().encode(value) };
    }
    if (!selectedImage) return setStatus("create", "imageRequired", "error"), null;
    if (selectedImage.size > MAX_IMAGE_BYTES) return setStatus("create", "imageTooLarge", "error"), null;
    return { kind: "image", mimeType: selectedImage.type || "application/octet-stream", bytes: new Uint8Array(await selectedImage.arrayBuffer()) };
  }

  async function openSecret() {
    if (openLocked) return;
    mode = "open";
    resetViewer();
    setStatus("open");
    const parsed = parseSecretUrl(openValue.trim());
    if (!parsed) return setStatus("open", "invalidLink", "error");
    if (!parsed.key) return setStatus("open", "missingKey", "error");
    try {
      setStatus("open", "opening");
      const response = await fetch(`/api/secrets/${parsed.id}/open?lang=${language}`, { method: "POST" });
      const result = await readJsonResponse<OpenResponse>(response, copy.openFailed);
      if (!response.ok) {
        if (result?.code === "secret_locked" && typeof result.unlockAt === "number" && typeof result.now === "number") {
          setStatus("open", undefined, "error", formatSecretLockedMessage(result.unlockAt, result.now, copy));
          return;
        }
        if (result?.code === "secret_opened" || result?.code === "secret_missing") openLocked = true;
        throw new Error(mapServerError(result?.code, "open"));
      }
      const cryptoKey = await crypto.subtle.importKey("raw", base64UrlDecode(parsed.key), "AES-GCM", false, ["decrypt"]);
      const plaintext = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64UrlDecode(result.iv) }, cryptoKey, base64UrlDecode(result.ciphertext));
      viewerVisible = true;
      countdown = VIEW_DURATION_SECONDS;
      openLocked = true;
      if (result.kind === "text") viewerText = new TextDecoder().decode(plaintext);
      else viewerImageUrl = URL.createObjectURL(new Blob([plaintext], { type: result.mimeType || "application/octet-stream" }));
      setStatus("open", "secretReady", "success");
      startBurnCountdown();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "";
      const messageKey = asStatusMessageKey(errorMessage) || "decryptFailed";
      setStatus("open", messageKey, "error", messageKey ? "" : errorMessage);
    }
  }

  function startBurnCountdown() {
    stopBurnCountdown();
    countdownTimer = window.setInterval(() => {
      countdown -= 1;
      if (countdown > 0) return;
      resetViewer();
      openLocked = true;
      setStatus("open", "burnedNow", "error");
    }, 1000);
  }

  function stopBurnCountdown() {
    if (!countdownTimer) return;
    clearInterval(countdownTimer);
    countdownTimer = null;
  }

  function applySelectedImage(file: File): void {
    if (file.size > MAX_IMAGE_BYTES) return setStatus("create", "imageTooLarge", "error");
    selectedImage = file;
    imageName = file.name;
    imageSize = formatBytes(file.size);
    releaseImagePreview();
    imagePreviewUrl = URL.createObjectURL(file);
    setStatus("create", "imageSelected", "success");
  }

  function handleImageChange(event: Event): void {
    const target = event.currentTarget as HTMLInputElement | null;
    const file = target?.files?.[0];
    if (!file) return;
    applySelectedImage(file);
    if (target) target.value = "";
  }

  function handleCreatePaste(event: ClipboardEvent): void {
    if (mode !== "create") return;
    const file = extractImageFile(event.clipboardData);
    if (!file) return;
    event.preventDefault();
    kind = "image";
    applySelectedImage(file);
  }

  function handleOpenPaste(): void {
    window.setTimeout(() => {
      const parsed = parseSecretUrl(openValue.trim());
      if (!parsed?.id || !parsed?.key) return;
      mode = "open";
      openSecret();
    }, 0);
  }

  async function copyResultLink(): Promise<void> {
    if (!resultLink) return;
    await navigator.clipboard.writeText(resultLink);
    setStatus("create", "copied", "success");
  }

  function syncFromLocation(): void {
    if (!window.location.pathname.match(/^\/s\/([^/]+)$/)) return;
    mode = "open";
    openValue = window.location.href;
    openSecret();
  }

  function releaseImagePreview(): void {
    if (!imagePreviewUrl) return;
    URL.revokeObjectURL(imagePreviewUrl);
    imagePreviewUrl = "";
  }

  function releaseViewerImage(): void {
    if (!viewerImageUrl) return;
    URL.revokeObjectURL(viewerImageUrl);
    viewerImageUrl = "";
  }

  function registerServiceWorker(): void {
    if (!("serviceWorker" in navigator)) return;
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}), { once: true });
  }
</script>

<svelte:head>
  <script type="application/ld+json">
    {JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", name: "FlashSeal", url: HOME_URL, applicationCategory: "SecurityApplication", operatingSystem: "Web", description: "Encrypted burn-after-open text and image sharing.", image: `${HOME_URL}og-image.png`, inLanguage: ["en", "zh", "ja", "ko"], offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, publisher: { "@type": "Organization", name: "FlashSeal", url: HOME_URL } })}
  </script>
</svelte:head>

<main class="mx-auto w-full max-w-[980px] px-5 pb-10 pt-4 sm:px-5">
  <Header {languageOrder} {translations} language={language} t={copy} bind:languageButton bind:languageMenu {menuOpen} onToggleMenu={() => (menuOpen = !menuOpen)} onSelectLanguage={setLanguage} />
  <section class="px-0 py-9 text-center sm:py-7">
    <h1 class="mb-3 text-[clamp(2.2rem,6vw,3.5rem)] leading-[1.04] tracking-[-0.04em]">{copy.heroTitle}</h1>
    <p class="my-1.5 text-[clamp(1rem,2vw,1.2rem)] text-muted">{copy.heroSubtitleLine1}</p>
    <p class="my-1.5 text-[clamp(1rem,2vw,1.2rem)] text-muted">{copy.heroSubtitleLine2}</p>
  </section>
  <section class="overflow-hidden rounded-[28px] border border-[rgba(214,220,228,0.85)] bg-[rgba(255,255,255,0.84)] shadow-shell backdrop-blur-[14px]">
    <div class="grid grid-cols-2 border-b border-line" role="tablist" aria-label="Secret actions">
      <button class={`relative px-5 pb-[14px] pt-4 font-semibold ${mode === "create" ? "text-green after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-green" : "text-muted"}`} type="button" role="tab" aria-selected={mode === "create"} on:click={() => (mode = "create")}>{copy.tabCreate}</button>
      <button class={`relative px-5 pb-[14px] pt-4 font-semibold ${mode === "open" ? "text-green after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-green" : "text-muted"}`} type="button" role="tab" aria-selected={mode === "open"} on:click={() => (mode = "open")}>{copy.tabOpen}</button>
    </div>
    {#if mode === "create"}
      <CreatePanel t={copy} {kind} {unlockDelayMinutes} unlockDelayOptions={UNLOCK_DELAY_OPTIONS} bind:textValue {imagePreviewUrl} {imageName} {imageSize} {resultLink} statusMessage={resolveStatusMessage(createStatus, copy)} statusKind={createStatus.kind} bind:fileInput onSelectKind={(value) => (kind = value)} onSelectUnlockDelay={(value) => (unlockDelayMinutes = value)} onPickImage={() => fileInput?.click()} onImageChange={handleImageChange} onCreate={createSecret} onCopy={copyResultLink} />
    {:else}
      <OpenPanel t={copy} bind:openValue {openLocked} statusMessage={resolveStatusMessage(openStatus, copy)} statusKind={openStatus.kind} {viewerVisible} {countdown} {viewerText} viewerImageUrl={viewerImageUrl} onInput={() => (openLocked = false)} onPaste={handleOpenPaste} onKeydown={(event) => event.key === "Enter" && (event.preventDefault(), openSecret())} onOpen={openSecret} />
    {/if}
  </section>
  <Features t={copy} />
</main>

<AppFooter t={copy} />
