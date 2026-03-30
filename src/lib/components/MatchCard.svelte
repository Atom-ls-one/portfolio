<script lang="ts">
	import Button from './Button.svelte';
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
		<div class="champion-icon">
			<img
				src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/{match.championId}.png"
				alt={match.championName}
				class="champion-img"
				loading="lazy"
			/>
			<span class="champion-fallback">{match.championName[0]}</span>
		</div>

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
		grid-template-columns: 9.375rem 2fr 1.5fr auto;
		gap: var(--spacing-md);
		align-items: center;
		padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) calc(var(--spacing-md) + 0.375rem);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: 0.125rem solid;
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
		width: 0.375rem;
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
		gap: 0.25rem;
	}

	.status-result {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 700;
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
		width: 2.5rem;
		height: 0.125rem;
		background-color: var(--color-gold-dark);
	}

	.status-type {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.status-duration {
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}

	.match-main {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.champion-icon {
		position: relative;
		width: 4.5rem;
		height: 4.5rem;
		border-radius: 50%;
		border: 0.125rem solid var(--color-gold-base);
		overflow: hidden;
		background: var(--color-bg-base);
		box-shadow: 0 0 0.9375rem color-mix(in oklch, var(--color-gold-base) 20%, transparent);
		flex-shrink: 0;
	}

	.champion-img {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.champion-fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-heading);
		font-size: 2rem;
		color: var(--color-magic-base);
		font-weight: 700;
		z-index: 1;
	}

	.match-details {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.match-title {
		font-size: 1.5rem;
		color: var(--color-gold-light);
		margin-bottom: -0.25rem;
	}

	.match-role {
		font-size: 0.875rem;
		color: var(--color-magic-base);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.match-desc {
		font-family: 'Marcellus', serif;
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
		max-width: 25rem;
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
		font-size: 1rem;
		color: var(--color-text-primary);
		letter-spacing: 0.1em;
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
			border-bottom: 0.0625rem solid var(--color-gold-dark);
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
