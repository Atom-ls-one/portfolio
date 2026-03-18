<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<title>{i18n.t.seo.title}</title>
	<meta name="description" content={i18n.t.seo.description} />
	<meta name="keywords" content={i18n.t.seo.keywords} />
	<meta property="og:title" content={i18n.t.seo.title} />
	<meta property="og:description" content={i18n.t.seo.description} />
	<meta property="og:type" content="website" />
	<html lang={i18n.locale}></html>
</svelte:head>

<nav class="lang-switcher" aria-label="Language">
	<button
		class="lang-btn {i18n.locale === 'fr' ? 'active' : ''}"
		onclick={() => i18n.setLocale('fr')}>{i18n.t.nav.lang_fr}</button
	>
	<span class="lang-sep">/</span>
	<button
		class="lang-btn {i18n.locale === 'en' ? 'active' : ''}"
		onclick={() => i18n.setLocale('en')}>{i18n.t.nav.lang_en}</button
	>
</nav>

<div class="page-wrapper">
	{@render children()}
</div>

<style>
	.page-wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.lang-switcher {
		position: absolute;
		top: var(--spacing-md);
		right: var(--spacing-md);
		display: flex;
		gap: 0.5rem;
		z-index: 100;
		font-family: var(--font-heading);
	}

	.lang-btn {
		color: var(--color-text-muted);
		transition: color var(--transition-fast);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.lang-btn:hover {
		color: var(--color-gold-light);
	}

	.lang-btn.active {
		color: var(--color-gold-base);
		font-weight: 700;
	}

	.lang-sep {
		color: var(--color-gold-dark);
	}
</style>
