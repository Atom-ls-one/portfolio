<script lang="ts">
	import Modal from './Modal.svelte';
	import ChampionPortrait from './ChampionPortrait.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import type { WorkEntry } from '$lib/data/works.svelte';
	import { getYoutubeId } from '$lib/utils/video';

	interface Props {
		work: WorkEntry | null;
		onClose: () => void;
	}

	let { work, onClose }: Props = $props();
</script>

<Modal isOpen={!!work} {onClose} title={work ? work[i18n.locale].title : ''}>
	{#if work}
		<div class="work-modal-layout">
			<div class="work-modal-header">
				<div class="champion-display">
					<ChampionPortrait
						championId={work.championId}
						championName={work.championName}
						variant="modal"
					/>
					<div class="work-main-info">
						<div class="work-date">{work.date}</div>
						<div class="work-type-tag">{work[i18n.locale].type}</div>
					</div>
				</div>
			</div>

			<div class="work-modal-grid">
				<div class="info-group">
					<span class="group-label">{i18n.t?.projects?.modalRole}</span>
					<span class="group-value">{work[i18n.locale].role}</span>
				</div>
				<div class="info-group">
					<span class="group-label">{i18n.t?.projects?.modalDuration}</span>
					<span class="group-value">{work[i18n.locale].duration}</span>
				</div>
			</div>

			<div class="work-modal-analysis">
				<h3>{i18n.t?.projects?.modalAnalysis}</h3>
				<div class="analysis-content">
					<p>{work[i18n.locale].description}</p>
				</div>
			</div>

			{#if work.videoUrl}
				{@const videoId = getYoutubeId(work.videoUrl)}
				{#if videoId}
					<div class="work-modal-video">
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
	.work-modal-layout {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.work-modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: var(--spacing-md);
		border-bottom: var(--border-hairline) solid
			color-mix(in oklch, var(--color-gold-dark) 20%, transparent);
	}

	.champion-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.work-main-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.work-date {
		font-family: var(--font-heading);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--fg-muted);
	}

	.work-type-tag {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--color-magic-base);
		background: color-mix(in oklch, var(--color-magic-base) 10%, transparent);
		padding: var(--space-1) var(--space-2);
		width: fit-content;
	}

	.work-modal-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 50%, transparent);
		padding: var(--spacing-md);
		border: var(--border-hairline) solid
			color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
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

	.work-modal-analysis,
	.work-modal-video {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.work-modal-analysis h3,
	.work-modal-video h3 {
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
		border: var(--border-hairline) solid
			color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.video-container {
		position: relative;
		width: 100%;
		padding-top: 56.25%;
		background: oklch(0% 0 0);
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
		.work-modal-header {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-md);
		}

		.work-modal-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
