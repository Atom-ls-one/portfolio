<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import MagicWaves from '$lib/components/MagicWaves.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = i18n.locale;
		}
	});
</script>

<svelte:head>
	<title>{i18n.t?.seo?.title}</title>
	<meta name="description" content={i18n.t?.seo?.description} />
	<meta name="keywords" content={i18n.t?.seo?.keywords} />
	<meta property="og:title" content={i18n.t?.seo?.title} />
	<meta property="og:description" content={i18n.t?.seo?.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<MagicWaves />

<nav class="lang-switcher" aria-label="Language">
	<button
		class="lang-btn {i18n.locale === 'fr' ? 'active' : ''}"
		onclick={() => i18n.setLocale('fr')}>{i18n.t?.nav?.lang_fr}</button
	>
	<span class="lang-sep">/</span>
	<button
		class="lang-btn {i18n.locale === 'en' ? 'active' : ''}"
		onclick={() => i18n.setLocale('en')}>{i18n.t?.nav?.lang_en}</button
	>
</nav>

<div class="page-wrapper">
	{#if children}
		{@render children()}
	{/if}
	<Footer />
</div>

<style>
	.page-wrapper {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 0;
		overflow-x: clip;
	}

	.page-wrapper > :global(main),
	.page-wrapper > :global(.history-page) {
		flex: 1 1 auto;
	}

	.lang-switcher {
		position: fixed;
		top: max(var(--page-gutter), env(safe-area-inset-top, 0px));
		right: max(var(--page-gutter), env(safe-area-inset-right, 0px));
		display: flex;
		gap: var(--space-2);
		z-index: 100;
		font-family: var(--font-heading);
		padding: var(--space-2) var(--space-3);
		background: color-mix(in oklch, var(--color-bg-base) 80%, transparent);
		backdrop-filter: blur(12px);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 25%, transparent);
	}

	.lang-btn {
		color: var(--fg-subtle);
		transition: color var(--transition-fast);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
	}

	.lang-btn:hover {
		color: var(--color-gold-light);
	}

	.lang-btn.active {
		color: var(--color-gold-base);
		font-weight: var(--font-weight-bold);
	}

	.lang-sep {
		color: var(--color-gold-dark);
	}
</style>
