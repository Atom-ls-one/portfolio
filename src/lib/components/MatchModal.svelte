<script lang="ts">
	import Modal from './Modal.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { MatchEntry } from '$lib/data/matches.svelte';
	import { getYoutubeId } from '$lib/utils/video';

	interface Props {
		match: MatchEntry | null;
		onClose: () => void;
	}

	let { match, onClose }: Props = $props();
</script>

<Modal
	isOpen={!!match}
	{onClose}
	title={match ? match[i18n.locale].title : ''}
>
	{#if match}
		<div class="match-modal-layout">
			<div class="match-modal-header">
				<div class="champion-display">
					<div class="champion-hex">
						<img
							src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/{match.championId}.png"
							alt={match.championName}
							class="modal-champion-img"
						/>
					</div>
					<div class="match-main-info">
						<div class="match-date">{match.date}</div>
						<div class="match-type-tag">{match[i18n.locale].type}</div>
					</div>
				</div>

				<div class="match-performance">
					<div class="performance-metric">
						<span class="metric-label">{i18n.t?.projects?.score || 'KDA'}</span>
						<span class="metric-value">{match.kda}</span>
					</div>
					<div class="performance-status {match.win ? 'win' : 'loss'}">
						{match[i18n.locale].result}
					</div>
				</div>
			</div>

			<div class="match-modal-grid">
				<div class="info-group">
					<span class="group-label">Role</span>
					<span class="group-value">{match[i18n.locale].role}</span>
				</div>
				<div class="info-group">
					<span class="group-label">Duration</span>
					<span class="group-value">{match[i18n.locale].duration}</span>
				</div>
			</div>

			<div class="match-modal-analysis">
				<h3>Strategic Analysis</h3>
				<div class="analysis-content">
					<p>{match[i18n.locale].description}</p>
				</div>
			</div>

			{#if match.videoUrl}
				{@const videoId = getYoutubeId(match.videoUrl)}
				{#if videoId}
					<div class="match-modal-video">
						<h3>Match VOD (Unlisted)</h3>
						<div class="video-container">
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/{videoId}"
								title="YouTube video player"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							></iframe>
						</div>
					</div>
				{/if}
			{/if}
		</div>
	{/if}
</Modal>

<style>
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
		border-bottom: 0.0625rem solid color-mix(in oklch, var(--color-gold-dark) 20%, transparent);
	}

	.champion-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.champion-hex {
		width: 5rem;
		height: 5rem;
		border: 0.125rem solid var(--color-gold-base);
		overflow: hidden;
		box-shadow: 0 0 1.25rem color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
	}

	.modal-champion-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.match-main-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
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
		padding: 0.125rem 0.5rem;
		width: fit-content;
	}

	.match-performance {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.25rem;
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

	.performance-status {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.performance-status.win {
		color: var(--color-magic-glow);
		text-shadow: 0 0 0.625rem var(--color-magic-base);
	}

	.performance-status.loss {
		color: oklch(70% 0.15 20);
	}

	.metric-value {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		color: var(--color-gold-light);
	}

	.match-modal-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 50%, transparent);
		padding: var(--spacing-md);
		border: 0.0625rem solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.info-group {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
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

	.match-modal-analysis h3,
	.match-modal-video h3 {
		font-size: 1.125rem;
		margin-bottom: var(--spacing-md);
		color: var(--color-gold-light);
		border-left: 0.1875rem solid var(--color-gold-base);
		padding-left: var(--spacing-sm);
	}

	.analysis-content {
		line-height: 1.7;
		color: var(--color-text-secondary);
		background: color-mix(in oklch, var(--color-bg-surface) 30%, transparent);
		padding: var(--spacing-md);
		border: 0.0625rem solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-top: 56.25%; /* 16:9 Aspect Ratio */
		background: #000;
		border: 0.0625rem solid var(--color-gold-dark);
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	@media (max-width: 37.5rem) {
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
