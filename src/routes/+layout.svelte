<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import { i18n } from '$lib/i18n.svelte';
	import MagicWaves from '$lib/components/MagicWaves.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children }: { children: Snippet } = $props();
	let langOpen = $state(false);

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.lang = i18n.locale;
		}
	});

	function selectLocale(lang: 'en' | 'fr' | 'ko') {
		i18n.setLocale(lang);
		langOpen = false;
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.nav-lang')) {
			langOpen = false;
		}
	}

	const sections = [
		{ id: 'about', key: 'about' as const },
		{ id: 'experience', key: 'experience' as const },
		{ id: 'projects', key: 'projects' as const },
		{ id: 'footer', key: 'contact' as const }
	];
</script>

<svelte:head>
	<title>{i18n.t?.seo?.title}</title>
	<meta name="description" content={i18n.t?.seo?.description} />
	<meta name="keywords" content={i18n.t?.seo?.keywords} />
	<meta property="og:title" content={i18n.t?.seo?.title} />
	<meta property="og:description" content={i18n.t?.seo?.description} />
	<meta property="og:type" content="website" />
</svelte:head>

<svelte:window onclick={handleClickOutside} />
<MagicWaves />

<nav class="site-nav" aria-label="Navigation">
	<div class="nav-links">
		{#each sections as section (section.id)}
			<a class="nav-link" href="#{section.id}">{i18n.t?.nav?.[section.key]}</a>
		{/each}
	</div>

	<div class="nav-lang">
		<button class="lang-toggle" onclick={() => (langOpen = !langOpen)} aria-expanded={langOpen}>
			{i18n.locale.toUpperCase()}
			<svg class="lang-chevron" class:lang-chevron--open={langOpen} viewBox="0 0 12 12" aria-hidden="true">
				<path d="M3 5l3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</button>
		{#if langOpen}
			<div class="lang-dropdown">
				<button class="lang-option {i18n.locale === 'fr' ? 'lang-option--active' : ''}" onclick={() => selectLocale('fr')}>FR</button>
				<button class="lang-option {i18n.locale === 'en' ? 'lang-option--active' : ''}" onclick={() => selectLocale('en')}>EN</button>
				<button class="lang-option {i18n.locale === 'ko' ? 'lang-option--active' : ''}" onclick={() => selectLocale('ko')}>KO</button>
			</div>
		{/if}
	</div>
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

	.site-nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 100;
		padding: var(--space-3) var(--spacing-lg);
		background: color-mix(in oklch, var(--color-bg-base) 80%, transparent);
		backdrop-filter: blur(12px);
		border-bottom: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 25%, transparent);
		font-family: var(--font-heading);
	}

	.nav-links {
		display: flex;
		gap: var(--space-1);
	}

	.nav-link {
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--fg-subtle);
		padding: var(--space-1) var(--space-3);
		transition: color var(--transition-fast);
		text-decoration: none;
	}

	.nav-link:hover {
		color: var(--color-gold-light);
	}

	.nav-lang {
		position: relative;
	}

	.lang-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		color: var(--color-gold-base);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		font-weight: var(--font-weight-bold);
		padding: var(--space-1) var(--space-3);
		transition: color var(--transition-fast);
	}

	.lang-toggle:hover {
		color: var(--color-gold-light);
	}

	.lang-chevron {
		width: var(--space-3);
		height: var(--space-3);
		transition: transform var(--transition-fast);
	}

	.lang-chevron--open {
		transform: rotate(180deg);
	}

	.lang-dropdown {
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: var(--space-1);
		display: flex;
		flex-direction: column;
		background: color-mix(in oklch, var(--color-bg-base) 92%, transparent);
		backdrop-filter: blur(12px);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
		min-width: var(--space-15);
	}

	.lang-option {
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--fg-subtle);
		padding: var(--space-2) var(--space-3);
		transition: color var(--transition-fast), background var(--transition-fast);
		text-align: left;
	}

	.lang-option:hover {
		color: var(--color-gold-light);
		background: color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.lang-option--active {
		color: var(--color-gold-base);
		font-weight: var(--font-weight-bold);
	}

	@media (max-width: 37.5rem) {
		.nav-link {
			font-size: var(--text-overline);
			padding: var(--space-1) var(--space-2);
		}
	}
</style>
