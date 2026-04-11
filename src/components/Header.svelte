<script lang="ts">
  import type { LanguageCode, Translation } from "../lib/translations";

  export let t: Translation;
  export let language: LanguageCode;
  export let languageOrder: readonly LanguageCode[];
  export let translations: Record<LanguageCode, Translation>;
  export let menuOpen = false;
  export let languageButton: HTMLButtonElement | undefined;
  export let languageMenu: HTMLDivElement | undefined;
  export let onToggleMenu: () => void;
  export let onSelectLanguage: (language: LanguageCode) => void;
</script>

<header class="relative z-20 grid grid-cols-[1fr_auto] items-center gap-3">
  <a class="inline-flex items-center gap-2.5 font-bold text-ink no-underline" href="/" aria-label="FlashSeal home">
    <span class="brand-mark-breathe inline-flex h-5 w-5 items-center justify-center text-green" aria-hidden="true"><i data-lucide="shield-check"></i></span>
    <span class="brand-text-breathe">FlashSeal</span>
  </a>
  <div class="inline-flex items-center gap-2.5">
    <a class="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl bg-[#edf2ed] px-3 py-2 font-semibold text-green-deep transition duration-150 hover:-translate-y-px hover:bg-[#e3ede3] focus-visible:-translate-y-px focus-visible:bg-[#e3ede3] focus-visible:outline-none" href="https://github.com/afetmin/FlashSeal" target="_blank" rel="noreferrer" aria-label="View FlashSeal on GitHub">
      <span class="inline-flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19.5 4.77 5.07 5.07 0 0 0 19.41 1S18.73.65 17 2.48a13.38 13.38 0 0 0-10 0C5.27.65 4.59 1 4.59 1A5.07 5.07 0 0 0 4.5 4.77 5.44 5.44 0 0 0 3.5 8.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.11V22" />
        </svg>
      </span>
      <span>GitHub</span>
    </a>
    <button bind:this={languageButton} class="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl bg-transparent px-2 py-2 text-muted transition duration-150 hover:-translate-y-px hover:text-green focus-visible:-translate-y-px focus-visible:text-green focus-visible:outline-none" type="button" aria-label="Change language" on:click={onToggleMenu}>
      <span class="inline-flex h-[18px] w-[18px] items-center justify-center" aria-hidden="true"><i data-lucide="languages"></i></span>
      <span>{t.languageShort}</span>
    </button>
  </div>
  <div bind:this={languageMenu} class="absolute right-0 top-[calc(100%+4px)] z-30 grid min-w-[132px] gap-1 rounded-2xl border border-line bg-surface p-1.5 shadow-shell" hidden={!menuOpen}>
    {#each languageOrder as item}
      <button type="button" class={`rounded-xl px-3 py-2.5 text-left text-ink transition ${item === language ? "bg-green-soft text-green-deep" : "hover:bg-green-soft hover:text-green-deep"}`} on:click={() => onSelectLanguage(item)}>
        {translations[item].languageName}
      </button>
    {/each}
  </div>
</header>
