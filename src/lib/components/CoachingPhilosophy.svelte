<script lang="ts">
	import SectionHeader from './SectionHeader.svelte';
	import { i18n } from '$lib/i18n.svelte';
</script>

<section id="philosophy" class="portfolio-section container section-lol-bg section-lol-bg--article">
	<SectionHeader title={i18n.t?.philosophy?.title} />

	<div class="philosophy-content">
		<blockquote class="philosophy-quote">
			<svg class="quote-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M10 8c-1.1 0-2 .9-2 2v4h4v-4H9.5c0-1.4 1.1-2.5 2.5-2.5V6C9.8 6 8 7.8 8 10h2zm8 0c-1.1 0-2 .9-2 2v4h4v-4h-2.5c0-1.4 1.1-2.5 2.5-2.5V6c-2.2 0-4 1.8-4 4h2z" fill="currentColor"/>
			</svg>
			<p>{i18n.t?.philosophy?.quote}</p>
		</blockquote>

		<div class="philosophy-approach">
			<h3 class="approach-title">{i18n.t?.philosophy?.approachTitle}</h3>
			<div class="approach-body">
				<p>{i18n.t?.philosophy?.approach1}</p>
				<p>{i18n.t?.philosophy?.approach2}</p>
			</div>
		</div>
	</div>
</section>

<style>
	.philosophy-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 60rem;
	}

	.philosophy-quote {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 50%, transparent);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
		border-left: var(--border-accent) solid var(--color-magic-base);
	}

	.quote-icon {
		width: var(--space-7);
		height: var(--space-7);
		flex-shrink: 0;
		color: var(--color-magic-base);
		opacity: 0.7;
	}

	.philosophy-quote p {
		font-family: var(--font-serif);
		font-size: var(--text-lead);
		line-height: var(--leading-body);
		color: var(--fg-prose);
		font-style: italic;
	}

	.philosophy-approach {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.approach-title {
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--color-magic-base);
		border-left: var(--border-accent) solid var(--color-magic-base);
		padding-left: var(--spacing-sm);
		text-transform: none;
	}

	.approach-body {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.approach-body p {
		font-family: var(--font-serif);
		font-size: var(--text-body);
		line-height: var(--leading-prose);
		color: var(--fg-prose);
		letter-spacing: var(--tracking-ui);
	}
</style>
