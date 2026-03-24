<script lang="ts">
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { matches, type MatchEntry } from '$lib/data/matches.svelte';
	import { base } from '$app/paths';

	interface Props {
		limit?: number;
	}

	let { limit }: Props = $props();

	let selectedMatch = $state<MatchEntry | null>(null);
	let displayedMatches = $derived(limit ? matches.list.slice(0, limit) : matches.list);

	function openMatchDetails(match: MatchEntry) {
		selectedMatch = match;
	}
</script>

<section id="projects" class="portfolio-section container">
	<header class="section-header-unified">
		<div class="header-line left"></div>
		<h2>{i18n.t?.projects?.title}</h2>
		<div class="header-line right"></div>
	</header>

	<div class="match-list">
		{#each displayedMatches as match (match.championId + match.kda)}
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
					<Button onclick={() => openMatchDetails(match)} className="btn--view">
						{i18n.t?.projects?.btn}
					</Button>
				</div>
			</article>
		{/each}
	</div>

	{#if limit && matches.list.length > limit}
		<footer class="section-footer">
			<Button href="{base}/history" className="btn--all">
				{i18n.t?.projects?.viewAll}
			</Button>
		</footer>
	{/if}

	<Modal
		isOpen={!!selectedMatch}
		onClose={() => (selectedMatch = null)}
		title={selectedMatch ? selectedMatch[i18n.locale].title : ''}
	>
		{#if selectedMatch}
			<div class="match-modal-layout">
				<div class="match-modal-header">
					<div class="champion-display">
						<div class="champion-hex">
							<img
								src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/{selectedMatch.championId}.png"
								alt={selectedMatch.championName}
								class="modal-champion-img"
							/>
						</div>
						<div class="match-main-info">
							<div class="match-date">{selectedMatch.date}</div>
							<div class="match-type-tag">{selectedMatch[i18n.locale].type}</div>
						</div>
					</div>

					<div class="match-performance">
						<div class="performance-metric">
							<span class="metric-label">{i18n.t?.projects?.score || 'KDA'}</span>
							<span class="metric-value">{selectedMatch.kda}</span>
						</div>
						<div class="performance-status {selectedMatch.win ? 'win' : 'loss'}">
							{selectedMatch[i18n.locale].result}
						</div>
					</div>
				</div>

				<div class="match-modal-grid">
					<div class="info-group">
						<span class="group-label">Role</span>
						<span class="group-value">{selectedMatch[i18n.locale].role}</span>
					</div>
					<div class="info-group">
						<span class="group-label">Duration</span>
						<span class="group-value">{selectedMatch[i18n.locale].duration}</span>
					</div>
				</div>

				<div class="match-modal-analysis">
					<h3>Strategic Analysis</h3>
					<div class="analysis-content">
						<p>{selectedMatch[i18n.locale].description}</p>
					</div>
				</div>

				<div class="match-modal-footer">
					<Button onclick={() => (selectedMatch = null)}>Close Analysis</Button>
				</div>
			</div>
		{/if}
	</Modal>
</section>

<style>
	.match-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.match-card {
		display: grid;
		grid-template-columns: 150px 2fr 1.5fr auto;
		gap: var(--spacing-md);
		align-items: center;
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border-left: 6px solid;
		border-top: 1px solid var(--color-gold-dark);
		border-bottom: 1px solid var(--color-gold-dark);
		border-right: 1px solid var(--color-gold-dark);
		transition: background var(--transition-base);
	}

	.match-card--victory {
		border-left-color: var(--color-magic-base);
		background: linear-gradient(
			90deg,
			color-mix(in oklch, var(--color-magic-base) 10%, transparent),
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent)
		);
	}

	.match-card--defeat {
		border-left-color: oklch(50% 0.15 20);
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
		text-shadow: 0 0 10px var(--color-magic-base);
	}

	.match-card--defeat .status-result {
		color: oklch(70% 0.15 20);
		text-shadow: 0 0 10px oklch(50% 0.15 20);
	}

	.status-divider {
		width: 40px;
		height: 2px;
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
		width: 72px;
		height: 72px;
		border-radius: 50%;
		border: 2px solid var(--color-gold-base);
		overflow: hidden;
		background: var(--color-bg-base);
		box-shadow: 0 0 15px color-mix(in oklch, var(--color-gold-base) 20%, transparent);
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
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		line-height: 1.4;
		max-width: 400px;
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

	.section-footer {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-md);
	}

	@media (max-width: 1024px) {
		.match-card {
			grid-template-columns: 1fr;
			gap: var(--spacing-md);
		}

		.match-status {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			border-bottom: 1px solid var(--color-gold-dark);
			padding-bottom: var(--spacing-xs);
		}

		.status-divider {
			display: none;
		}

		.match-stats {
			align-items: flex-start;
		}
	}

	/* Modal Specific Styles */
	.match-modal-layout {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.match-modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: var(--spacing-md);
		border-bottom: 1px solid color-mix(in oklch, var(--color-gold-dark) 20%, transparent);
	}

	.champion-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.champion-hex {
		width: 80px;
		height: 80px;
		border: 2px solid var(--color-gold-base);
		overflow: hidden;
		box-shadow: 0 0 20px color-mix(in oklch, var(--color-gold-base) 30%, transparent);
	}

	.modal-champion-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.match-main-info {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.match-date {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.match-type-tag {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-magic-base);
		background: color-mix(in oklch, var(--color-magic-base) 10%, transparent);
		padding: 2px 8px;
		width: fit-content;
	}

	.match-performance {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 4px;
	}

	.performance-metric {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.metric-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
	}

	.metric-value {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		color: var(--color-gold-light);
	}

	.performance-status {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.performance-status.win {
		color: var(--color-magic-glow);
		text-shadow: 0 0 10px var(--color-magic-base);
	}

	.performance-status.loss {
		color: oklch(70% 0.15 20);
	}

	.match-modal-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 50%, transparent);
		padding: var(--spacing-md);
		border: 1px solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.info-group {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.group-label {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.group-value {
		font-family: var(--font-heading);
		color: var(--color-gold-base);
	}

	.match-modal-analysis h3 {
		font-size: 1.125rem;
		margin-bottom: var(--spacing-md);
		color: var(--color-gold-light);
		border-left: 3px solid var(--color-gold-base);
		padding-left: var(--spacing-sm);
	}

	.analysis-content {
		line-height: 1.7;
		color: var(--color-text-secondary);
		background: color-mix(in oklch, var(--color-bg-surface) 30%, transparent);
		padding: var(--spacing-md);
		border: 1px solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.match-modal-footer {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-sm);
	}

	@media (max-width: 600px) {
		.match-modal-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.match-performance {
			align-items: flex-start;
			width: 100%;
			flex-direction: row;
			justify-content: space-between;
		}

		.match-modal-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
