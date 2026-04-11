<script lang="ts">
  import type { Translation } from "../lib/translations";

  export let t: Translation;
</script>

<footer class="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-start gap-2 px-5 pb-6 text-[0.92rem] text-muted">
  <a class="inline-flex items-center text-[color:color-mix(in_srgb,var(--color-ink)_62%,white)] transition duration-150 hover:-translate-y-px hover:text-green focus-visible:-translate-y-px focus-visible:text-green focus-visible:outline-none [&_svg]:h-[14px] [&_svg]:w-[14px]" href="https://github.com/afetmin/FlashSeal" target="_blank" rel="noreferrer" aria-label="View FlashSeal on GitHub">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19.5 4.77 5.07 5.07 0 0 0 19.41 1S18.73.65 17 2.48a13.38 13.38 0 0 0-10 0C5.27.65 4.59 1 4.59 1A5.07 5.07 0 0 0 4.5 4.77 5.44 5.44 0 0 0 3.5 8.5c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.11V22" />
    </svg>
  </a>
  <small>{t.footerCopy}</small>
</footer>
