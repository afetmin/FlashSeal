<script lang="ts">
  import type { Translation } from "../lib/translations";

  export let t: Translation;
</script>

<section class="mt-[30px] grid gap-3.5 sm:grid-cols-2" aria-label="FlashSeal features">
  <article class="rounded-[18px] border border-line bg-[rgba(255,255,255,0.72)] p-[18px] shadow-card">
    <span class="mb-[14px] inline-grid h-9 w-9 place-items-center rounded-xl bg-green-soft text-green" aria-hidden="true"><i data-lucide="lock-keyhole"></i></span>
    <h2 class="mb-2 text-base font-semibold">{t.featureEncryptionTitle}</h2>
    <p class="text-[0.95rem] leading-[1.5] text-muted">{t.featureEncryptionBody}</p>
  </article>
  <article class="rounded-[18px] border border-line bg-[rgba(255,255,255,0.72)] p-[18px] shadow-card">
    <span class="mb-[14px] inline-grid h-9 w-9 place-items-center rounded-xl bg-green-soft text-green" aria-hidden="true"><i data-lucide="eye"></i></span>
    <h2 class="mb-2 text-base font-semibold">{t.featureOnceTitle}</h2>
    <p class="text-[0.95rem] leading-[1.5] text-muted">{t.featureOnceBody}</p>
  </article>
  <article class="rounded-[18px] border border-line bg-[rgba(255,255,255,0.72)] p-[18px] shadow-card">
    <span class="mb-[14px] inline-grid h-9 w-9 place-items-center rounded-xl bg-green-soft text-green" aria-hidden="true"><i data-lucide="timer"></i></span>
    <h2 class="mb-2 text-base font-semibold">{t.featureWindowTitle}</h2>
    <p class="text-[0.95rem] leading-[1.5] text-muted">{t.featureWindowBody}</p>
  </article>
  <article class="rounded-[18px] border border-line bg-[rgba(255,255,255,0.72)] p-[18px] shadow-card">
    <span class="mb-[14px] inline-grid h-9 w-9 place-items-center rounded-xl bg-green-soft text-green" aria-hidden="true"><i data-lucide="flame"></i></span>
    <h2 class="mb-2 text-base font-semibold">{t.featureExpiryTitle}</h2>
    <p class="text-[0.95rem] leading-[1.5] text-muted">{t.featureExpiryBody}</p>
  </article>
</section>
