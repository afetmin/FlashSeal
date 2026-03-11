<script lang="ts">
  import type { StatusKind } from "../lib/status";
  import type { Translation } from "../lib/translations";

  export let t: Translation;
  export let openValue = "";
  export let openLocked = false;
  export let statusMessage = "";
  export let statusKind: StatusKind = "";
  export let viewerVisible = false;
  export let countdown = 60;
  export let viewerText = "";
  export let viewerImageUrl = "";
  export let onInput: () => void;
  export let onPaste: () => void;
  export let onKeydown: (event: KeyboardEvent) => void;
  export let onOpen: () => void;
</script>

<section class="px-3.5 py-[18px] sm:px-[22px] sm:py-[22px]" role="tabpanel">
  <label class="grid gap-2.5 text-[0.95rem] text-ink" for="open-link">
    <span>{t.openLabel}</span>
    <input id="open-link" class="w-full rounded-[20px] border border-line bg-surface-soft p-[18px] text-ink outline-none transition placeholder:text-[#b1b8c5] focus:border-[rgba(79,179,79,0.5)] focus:shadow-[0_0_0_3px_rgba(79,179,79,0.12)]" type="url" autocomplete="off" placeholder={t.openInputPlaceholder} bind:value={openValue} on:input={onInput} on:paste={onPaste} on:keydown={onKeydown} />
  </label>
  <button id="open-button" class="mt-[18px] w-full rounded-2xl bg-green px-5 py-4 font-bold text-white transition hover:bg-green-deep focus-visible:bg-green-deep disabled:cursor-not-allowed disabled:bg-[#b9c4b9] disabled:text-[rgba(255,255,255,0.88)]" type="button" disabled={openLocked} aria-disabled={openLocked} on:click={onOpen}>
    {t.openButton}
  </button>
  <p class={`mt-3 min-h-[1.4em] text-[0.95rem] ${statusKind === "error" ? "text-danger" : statusKind === "success" ? "text-green-deep" : "text-muted"}`}>{statusMessage}</p>

  <section class="mt-[18px] rounded-[22px] border border-line bg-surface-soft p-[18px]" hidden={!viewerVisible}>
    <div class="mb-[14px] flex items-start justify-between gap-3 sm:items-center">
      <div class="grid gap-1">
        <strong>{t.viewerTitle}</strong>
        <span class="text-muted">{t.countdownLabel.replace("{seconds}", String(countdown))}</span>
      </div>
      <div class="grid h-12 w-12 place-items-center rounded-full bg-green-soft text-[1.2rem] font-extrabold text-green-deep">{countdown}</div>
    </div>
    <div class="whitespace-pre-wrap break-words rounded-[20px] border border-line bg-surface-soft p-[18px] leading-[1.6]" hidden={!viewerText}>{viewerText}</div>
    <div class="rounded-[20px] border border-line bg-surface-soft p-[10px]" hidden={!viewerImageUrl}>
      <img class="block max-h-[380px] w-full rounded-[18px] object-contain" src={viewerImageUrl} alt="" />
    </div>
  </section>
</section>
