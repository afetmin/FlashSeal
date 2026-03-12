<script lang="ts">
  import type { SecretKind } from "../lib/core";
  import type { StatusKind } from "../lib/status";
  import type { Translation } from "../lib/translations";
  import { formatUnlockDelayOption, type UnlockDelayMinutes } from "../lib/unlock";

  export let t: Translation;
  export let kind: SecretKind;
  export let unlockDelayMinutes: UnlockDelayMinutes;
  export let unlockDelayOptions: readonly UnlockDelayMinutes[];
  export let textValue = "";
  export let imagePreviewUrl = "";
  export let imageName = "";
  export let imageSize = "";
  export let resultLink = "";
  export let statusMessage = "";
  export let statusKind: StatusKind = "";
  export let fileInput: HTMLInputElement | undefined;
  export let onSelectKind: (kind: SecretKind) => void;
  export let onSelectUnlockDelay: (minutes: UnlockDelayMinutes) => void;
  export let onPickImage: () => void;
  export let onImageChange: (event: Event) => void;
  export let onCreate: () => void;
  export let onCopy: () => void | Promise<void>;
</script>

<section class="px-3.5 py-[18px] sm:px-[22px] sm:py-[22px]" role="tabpanel">
  <div class="mb-4 flex flex-col gap-3 rounded-[20px] bg-[rgba(237,242,237,0.68)] px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
    <div class="inline-flex gap-2.5" role="tablist" aria-label="Secret type">
      <button class={`rounded-full px-4 py-1.5 text-[0.93rem] font-bold ${kind === "text" ? "bg-green text-white" : "bg-[#dcebdc] text-green"}`} type="button" role="tab" aria-selected={kind === "text"} on:click={() => onSelectKind("text")}>{t.kindText}</button>
      <button class={`rounded-full px-4 py-1.5 text-[0.93rem] font-bold ${kind === "image" ? "bg-green text-white" : "bg-[#dcebdc] text-green"}`} type="button" role="tab" aria-selected={kind === "image"} on:click={() => onSelectKind("image")}>{t.kindImage}</button>
    </div>
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end lg:gap-4">
      <div class="text-[0.95rem] font-semibold whitespace-nowrap text-ink">{t.delayLabel}</div>
      <div class="flex flex-wrap gap-2.5">
        {#each unlockDelayOptions as delay}
          <button
            class={`rounded-full px-4 py-1.5 text-[0.93rem] font-bold ${unlockDelayMinutes === delay ? "bg-green text-white" : "bg-[#dcebdc] text-green"}`}
            type="button"
            aria-pressed={unlockDelayMinutes === delay}
            on:click={() => onSelectUnlockDelay(delay)}
          >
            {formatUnlockDelayOption(delay, t)}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="mb-4" hidden={kind !== "text"}>
    <label class="grid gap-2.5 text-[0.95rem] text-ink" for="secret-text">
      <span class="sr-only">{t.textPlaceholder}</span>
      <textarea id="secret-text" class="w-full rounded-[20px] border border-line bg-surface-soft p-[18px] text-ink outline-none transition placeholder:text-[#b1b8c5] focus:border-[rgba(79,179,79,0.5)] focus:shadow-[0_0_0_3px_rgba(79,179,79,0.12)]" rows="7" placeholder={t.textPlaceholder} bind:value={textValue}></textarea>
    </label>
  </div>

  <div class="mb-4" hidden={kind !== "image"}>
    <input bind:this={fileInput} class="sr-only" type="file" accept="image/*" on:change={onImageChange} />
    <button class="grid min-h-[188px] w-full place-items-center gap-2 rounded-[20px] border border-line bg-surface-soft p-6 text-center" type="button" on:click={onPickImage}>
      <span class="inline-flex h-6 w-6 items-center justify-center text-green" aria-hidden="true"><i data-lucide="image-up"></i></span>
      <span class="font-bold">{t.imagePickerTitle}</span>
      <span class="text-[0.92rem] text-muted">{t.imagePickerHelp}</span>
    </button>
    <div class="mt-[14px] grid gap-3" hidden={!imagePreviewUrl}>
      <img class="block max-h-[380px] w-full rounded-[18px] object-contain" src={imagePreviewUrl} alt="" />
      <div class="flex flex-col justify-between gap-3 text-[0.92rem] text-muted sm:flex-row">
        <strong>{imageName}</strong>
        <span>{imageSize}</span>
      </div>
    </div>
  </div>

  <button class="w-full rounded-2xl bg-green px-5 py-4 font-bold text-white transition hover:bg-green-deep focus-visible:bg-green-deep disabled:cursor-not-allowed disabled:bg-[#b9c4b9] disabled:text-[rgba(255,255,255,0.88)]" type="button" on:click={onCreate}>{t.createButton}</button>
  <p class="mt-3 text-[0.95rem] text-muted">{t.createHint}</p>
  <p class={`mt-3 min-h-[1.4em] text-[0.95rem] ${statusKind === "error" ? "text-danger" : statusKind === "success" ? "text-green-deep" : "text-muted"}`}>{statusMessage}</p>

  <section class="mt-[18px] rounded-[20px] border border-line bg-surface-soft p-[18px]" hidden={!resultLink}>
    <div class="mb-2.5 text-[0.9rem] text-muted">{t.resultLabel}</div>
    <div class="break-words font-semibold">{resultLink}</div>
    <div class="mt-[14px]">
      <button class="w-full rounded-2xl bg-[#edf2ed] px-5 py-4 font-bold text-green-deep transition active:translate-y-px" type="button" on:click={onCopy}>{t.copyButton}</button>
    </div>
  </section>
</section>
