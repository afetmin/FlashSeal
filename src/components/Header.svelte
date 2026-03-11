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
  <div class="inline-flex items-center gap-3.5">
    <a class="inline-flex h-[18px] w-[18px] items-center justify-center text-green transition duration-150 hover:-translate-y-px hover:text-green focus-visible:-translate-y-px focus-visible:text-green focus-visible:outline-none" href="https://github.com/afetmin/FlashSeal" target="_blank" rel="noreferrer" aria-label="View FlashSeal on GitHub">
      <i data-lucide="github" aria-hidden="true"></i>
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
