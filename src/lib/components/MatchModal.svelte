<script lang="ts">
	import Modal from './Modal.svelte';
	import ChampionPortrait from './ChampionPortrait.svelte';
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
					<ChampionPortrait
						championId={match.championId}
						championName={match.championName}
						variant="modal"
					/>
					<div class="match-main-info">
						<div class="match-date">{match.date}</div>
						<div class="match-type-tag">{match[i18n.locale].type}</div>
					</div>
				</div>

				<div class="match-performance">
					<div class="performance-metric">
						<span class="metric-label">{i18n.t?.projects?.score}</span>
						<span class="metric-value">{match.kda}</span>
					</div>
					<div class="performance-status {match.win ? 'win' : 'loss'}">
						{match[i18n.locale].result}
					</div>
				</div>
			</div>

			<div class="match-modal-grid">
				<div class="info-group">
					<span class="group-label">{i18n.t?.projects?.modalRole}</span>
					<span class="group-value">{match[i18n.locale].role}</span>
				</div>
				<div class="info-group">
					<span class="group-label">{i18n.t?.projects?.modalDuration}</span>
					<span class="group-value">{match[i18n.locale].duration}</span>
				</div>
			</div>

			<div class="match-modal-analysis">
				<h3>{i18n.t?.projects?.modalAnalysis}</h3>
				<div class="analysis-content">
					<p>{match[i18n.locale].description}</p>
				</div>
			</div>

			{#if match.videoUrl}
				{@const videoId = getYoutubeId(match.videoUrl)}
				{#if videoId}
					<div class="match-modal-video">
						<h3>{i18n.t?.projects?.modalVod}</h3>
						<div class="video-container">
							<iframe
								width="560"
								height="315"
								src="https://www.youtube.com/embed/{videoId}"
								title={i18n.t?.projects?.youtubeIframeTitle ?? ''}
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
		border-bottom: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 20%, transparent);
	}

	.champion-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.match-main-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.match-date {
		font-family: var(--font-heading);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--fg-muted);
	}

	.match-type-tag {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--color-magic-base);
		background: color-mix(in oklch, var(--color-magic-base) 10%, transparent);
		padding: var(--space-1) var(--space-2);
		width: fit-content;
	}

	.match-performance {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-1);
	}

	.performance-metric {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.metric-label {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		color: var(--fg-subtle);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps-wide);
	}

	.performance-status {
		font-family: var(--font-heading);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		font-weight: var(--font-weight-bold);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
	}

	.performance-status.win {
		color: var(--color-magic-glow);
	}

	.performance-status.loss {
		color: oklch(70% 0.15 20);
	}

	.metric-value {
		font-family: var(--font-heading);
		font-size: var(--text-match-title);
		line-height: var(--leading-tight);
		color: var(--color-gold-light);
	}

	.match-modal-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 50%, transparent);
		padding: var(--spacing-md);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.info-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-0-5);
	}

	.group-label {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		color: var(--fg-subtle);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps-wide);
	}

	.group-value {
		font-family: var(--font-heading);
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--color-gold-base);
	}

	.match-modal-analysis,
	.match-modal-video {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.match-modal-analysis h3,
	.match-modal-video h3 {
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--color-gold-light);
		border-left: var(--border-accent) solid var(--color-gold-base);
		padding-left: var(--spacing-sm);
	}

	.analysis-content {
		font-size: var(--text-body);
		line-height: var(--leading-relaxed);
		letter-spacing: var(--tracking-ui);
		color: var(--fg-prose);
		background: color-mix(in oklch, var(--color-bg-surface) 30%, transparent);
		padding: var(--spacing-md);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-top: 56.25%; /* 16:9 Aspect Ratio */
		background: #000;
		border: var(--border-hairline) solid var(--color-gold-dark);
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
