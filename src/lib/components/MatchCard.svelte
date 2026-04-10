<script lang="ts">
	import Button from './Button.svelte';
	import ChampionPortrait from './ChampionPortrait.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { MatchEntry } from '$lib/data/matches.svelte';

	interface Props {
		match: MatchEntry;
		onViewDetails: (match: MatchEntry) => void;
	}

	let { match, onViewDetails }: Props = $props();
</script>

<article class="match-card {match.win ? 'match-card--victory' : 'match-card--defeat'}">
	<div class="match-status">
		<span class="status-result">{match[i18n.locale]?.result}</span>
		<div class="status-divider"></div>
		<span class="status-type">{match[i18n.locale]?.type}</span>
		<time class="status-duration">{match[i18n.locale]?.duration}</time>
	</div>

	<div class="match-main">
		<ChampionPortrait
			championId={match.championId}
			championName={match.championName}
			variant="card"
		/>

		<div class="match-details">
			<h3 class="match-title">{match[i18n.locale]?.title}</h3>
			<span class="match-role">{match[i18n.locale]?.role}</span>
			<p class="match-desc">{match[i18n.locale]?.description}</p>
		</div>
	</div>

	<div class="match-stats">
		<span class="kda">{i18n.t?.projects?.score} {match.kda}</span>
	</div>

	<div class="match-actions">
		<Button onclick={() => onViewDetails(match)} className="btn--view">
			{i18n.t?.projects?.btn}
		</Button>
	</div>
</article>

<style>
	.match-card {
		display: grid;
		grid-template-columns: var(--layout-match-sidebar) 2fr 1.5fr auto;
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

	.match-card::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: var(--space-1-5);
		background: var(--indicator-color, var(--color-gold-dark));
	}

	.match-card--victory {
		--indicator-color: var(--color-magic-base);
		background: linear-gradient(
			90deg,
			color-mix(in oklch, var(--color-magic-base) 10%, transparent),
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent)
		);
	}

	.match-card--defeat {
		--indicator-color: oklch(50% 0.15 20);
		background: linear-gradient(
			90deg,
			oklch(50% 0.15 20 / 0.1),
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent)
		);
	}

	.match-status {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--space-1);
	}

	.status-result {
		font-family: var(--font-heading);
		font-size: var(--text-card-title);
		line-height: var(--leading-tight);
		font-weight: var(--font-weight-bold);
	}

	.match-card--victory .status-result {
		color: var(--color-magic-glow);
		text-shadow: 0 0 0.625rem var(--color-magic-base);
	}

	.match-card--defeat .status-result {
		color: oklch(70% 0.15 20);
		text-shadow: 0 0 0.625rem oklch(50% 0.15 20);
	}

	.status-divider {
		width: var(--space-11);
		height: var(--border-default);
		background-color: var(--color-gold-dark);
	}

	.status-type {
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--fg-muted);
	}

	.status-duration {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		color: var(--fg-subtle);
	}

	.match-main {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.match-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
	}

	.match-title {
		font-size: var(--text-match-title);
		line-height: var(--leading-tight);
		color: var(--color-gold-light);
	}

	.match-role {
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--color-magic-base);
		font-weight: var(--font-weight-semibold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-hero-sub);
	}

	.match-desc {
		font-family: var(--font-serif);
		font-size: var(--text-body);
		color: var(--fg-muted);
		line-height: var(--leading-normal);
		letter-spacing: var(--tracking-ui);
		max-width: var(--content-measure-match-desc);
		text-wrap: balance;
	}

	.match-stats {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--spacing-sm);
	}

	.kda {
		font-family: var(--font-heading);
		font-size: var(--text-ui);
		line-height: var(--leading-ui);
		color: var(--fg-default);
		letter-spacing: var(--tracking-caps);
	}

	@media (max-width: 64rem) {
		.match-card {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.match-status {
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

		.match-stats {
			align-items: flex-start;
		}
	}
</style>
