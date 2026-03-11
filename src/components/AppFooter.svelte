<script lang="ts">
  import type { Translation } from "../lib/translations";

  export let t: Translation;
</script>

<footer class="mx-auto flex w-full max-w-[980px] flex-wrap items-center justify-start gap-2 px-5 pb-6 text-[0.92rem] text-muted">
  <a class="inline-flex items-center text-[color:color-mix(in_srgb,var(--color-ink)_62%,white)] transition duration-150 hover:-translate-y-px hover:text-green focus-visible:-translate-y-px focus-visible:text-green focus-visible:outline-none [&_svg]:h-[14px] [&_svg]:w-[14px]" href="https://github.com/afetmin/FlashSeal" target="_blank" rel="noreferrer" aria-label="View FlashSeal on GitHub">
    <i data-lucide="github" aria-hidden="true"></i>
  </a>
  <small>{t.footerCopy}</small>
</footer>
