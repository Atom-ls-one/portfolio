<script lang="ts">
	import Button from './Button.svelte';
	import ChampionPortrait from './ChampionPortrait.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { WorkEntry } from '$lib/data/works.svelte';

	interface Props {
		work: WorkEntry;
		onViewDetails: (work: WorkEntry) => void;
	}

	let { work, onViewDetails }: Props = $props();
</script>

<article class="work-card">
	<div class="work-status">
		<span class="status-type">{work[i18n.locale]?.type}</span>
		<div class="status-divider"></div>
		<time class="status-duration">{work[i18n.locale]?.duration}</time>
	</div>

	<div class="work-main">
		<ChampionPortrait
			championId={work.championId}
			championName={work.championName}
			variant="card"
		/>

		<div class="work-details">
			<h3 class="work-title">{work[i18n.locale]?.title}</h3>
			<span class="work-role">{work[i18n.locale]?.role}</span>
			<p class="work-desc">{work[i18n.locale]?.description}</p>
		</div>
	</div>

	<div class="work-actions">
		<Button onclick={() => onViewDetails(work)} className="btn--view">
			{i18n.t?.projects?.btn}
		</Button>
	</div>
</article>

<style>
	.work-card {
		display: grid;
		grid-template-columns: var(--layout-match-sidebar) 2fr auto;
		gap: var(--spacing-md);
		align-items: center;
		padding: var(--spacing-md) var(--spacing-md) var(--spacing-md)
			calc(var(--spacing-md) + var(--space-1-5));
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: var(--border-default) solid;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			oklch(44.8% 0.094 77.1)
		);
		border-image-slice: 1;
		transition: background var(--transition-base);
		position: relative;
	}

	.work-card::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: var(--space-1-5);
		background: var(--color-gold-dark);
	}

	.work-card:hover {
		background: color-mix(in oklch, var(--color-bg-surface) 55%, transparent);
	}

	.work-status {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-1);
	}

	.status-divider {
		width: var(--space-11);
		height: var(--border-default);
		background-color: var(--color-gold-dark);
	}

	.status-type {
		font-family: var(--font-heading);
		font-size: var(--text-card-title);
		line-height: var(--leading-tight);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--color-gold-light);
	}

	.status-duration {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		color: var(--fg-subtle);
	}

	.work-main {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.work-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
	}

	.work-title {
		font-size: var(--text-match-title);
		line-height: var(--leading-tight);
		color: var(--color-gold-light);
	}

	.work-role {
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--color-magic-base);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-hero-sub);
	}

	.work-desc {
		font-family: var(--font-serif);
		font-size: var(--text-body);
		color: var(--fg-muted);
		line-height: var(--leading-normal);
		letter-spacing: var(--tracking-ui);
		max-width: var(--content-measure-match-desc);
		text-wrap: balance;
	}

	@media (max-width: 64rem) {
		.work-card {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.work-status {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			border-bottom: var(--border-hairline) solid var(--color-gold-dark);
			padding-bottom: var(--spacing-xs);
		}

		.status-divider {
			display: none;
		}
	}
</style>
