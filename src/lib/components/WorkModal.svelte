<script lang="ts">
	import Modal from './Modal.svelte';
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
			<div class="work-modal-analysis">
				<h3>{i18n.t?.projects?.modalAnalysis}</h3>
				<div class="analysis-content">
					{#if work[i18n.locale].content}
						<div class="content-body">
							{@html work[i18n.locale].content}
						</div>
					{:else}
						<p>{work[i18n.locale].description}</p>
					{/if}
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
		max-height: 60vh;
		overflow-y: auto;
	}

	.content-body h2 {
		font-family: var(--font-heading);
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--color-gold-light);
		margin-top: var(--spacing-2xl);
		margin-bottom: var(--spacing-lg);
	}

	.content-body h2:first-child {
		margin-top: 0;
	}

	.content-body h3 {
		font-family: var(--font-heading);
		font-size: var(--text-body);
		line-height: var(--leading-snug);
		color: var(--color-gold-base);
		margin-top: var(--spacing-xl);
		margin-bottom: var(--spacing-md);
	}

	.content-body p {
		margin-bottom: var(--spacing-lg);
	}

	.content-body p:last-child {
		margin-bottom: 0;
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
	}
</style>
