<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import journeyData from '$lib/data/journey.json';

	interface TimelineEvent {
		date: string;
		type: 'experience' | 'achievement';
		title: { en: string; fr: string } | string;
		subtitle?: { en: string; fr: string } | string;
		desc?: { en: string; fr: string } | string;
		place?: { en: string; fr: string } | string;
		event?: string;
	}

	const journey = journeyData as TimelineEvent[];
</script>

<section id="experience" class="portfolio-section container section-lol-bg section-lol-bg--client">
	<SectionHeader title={i18n.t.experience.title} />

	<div class="journey-container">
		<div class="timeline-line"></div>
		
		<div class="journey-events">
			{#each journey as event, i (event.date + i)}
				<div class="event-wrapper {event.type === 'achievement' ? 'is-achievement' : 'is-experience'}">
					<div class="event-marker">
						<div class="marker-crystal"></div>
					</div>
					
					<div class="event-card-container">
						<div class="event-date">
						{#if event.date.includes('->')}
							{@const [start, end] = event.date.split('->').map(s => s.trim())}
							<span class="date-start">{start}</span>
							<svg class="date-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
								<path d="M5 12h14m-7-7 7 7-7 7"/>
							</svg>
							<span class="date-end">{end}</span>
						{:else}
							{event.date}
						{/if}
					</div>
						<article class="event-card {event.type}">
							{#if event.type === 'achievement'}
								<div class="achievement-glow"></div>
							{/if}

							<span class="event-type-tag">
								{event.type === 'achievement'
									? i18n.t?.experience?.tagAchievement
									: i18n.t?.experience?.tagRole}
							</span>
							
							<h3 class="event-title">{i18n.translate(event.title)}</h3>
							
							{#if event.type === 'achievement'}
								<div class="achievement-details">
									<div class="event-event">{event.event}</div>
									<div class="event-place">{i18n.translate(event.place)}</div>
								</div>
							{:else}
								<p class="event-desc">{i18n.translate(event.desc as any)}</p>
							{/if}
						</article>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.journey-container {
		position: relative;
		width: 100%;
		max-width: min(var(--container-journey), 100%);
		margin-inline: auto;
		padding-bottom: var(--spacing-xl);
	}

	/* Central line */
	.timeline-line {
		position: absolute;
		left: 50%;
		top: 0;
		bottom: 0;
		width: var(--border-default);
		background: linear-gradient(
			to bottom,
			transparent,
			var(--color-gold-dark) 10%,
			var(--color-gold-dark) 90%,
			transparent
		);
		transform: translateX(-50%);
	}

	.journey-events {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
	}

	.event-wrapper {
		display: flex;
		width: 100%;
		position: relative;
		min-height: var(--layout-timeline-row-min);
	}

	/* Alternating sides for desktop */
	.is-experience {
		flex-direction: row-reverse;
	}

	.is-achievement {
		flex-direction: row;
	}

	.event-marker {
		position: absolute;
		left: 50%;
		top: var(--space-7);
		transform: translateX(-50%);
		z-index: 10;
	}

	.marker-crystal {
		width: var(--space-3);
		height: var(--space-3);
		background: var(--color-gold-base);
		transform: rotate(45deg);
		border: var(--border-hairline) solid var(--color-gold-light);
		box-shadow: 0 0 10px var(--color-gold-base);
	}

	.is-achievement .marker-crystal {
		width: var(--space-4);
		height: var(--space-4);
		background: var(--color-gold-light);
		box-shadow: 0 0 15px var(--color-gold-light);
	}

	.event-card-container {
		width: 45%;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.is-experience .event-card-container {
		align-items: flex-end;
		text-align: right;
	}

	.is-achievement .event-card-container {
		align-items: flex-start;
		text-align: left;
	}

	.event-date {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-family: var(--font-heading);
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		color: var(--color-magic-base);
		letter-spacing: var(--tracking-caps);
		font-weight: var(--font-weight-bold);
	}

	.date-arrow {
		color: var(--color-gold-base);
		opacity: 0.8;
	}

	.date-end {
		color: var(--color-gold-light);
	}

	.event-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: var(--border-hairline) solid;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			oklch(44.8% 0.094 77.1)
		);
		border-image-slice: 1;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.event-card.achievement {
		background: linear-gradient(
			165deg,
			color-mix(in oklch, var(--color-bg-surface) 82%, var(--color-gold-base)) 0%,
			color-mix(in oklch, var(--color-bg-surface) 96%, var(--color-gold-base)) 45%,
			var(--color-bg-surface) 100%
		);
		border-width: var(--border-default);
		border-image: linear-gradient(
			to bottom right,
			var(--color-gold-light),
			var(--color-gold-dark)
		) 1;
		box-shadow: 
			0 12px 40px -12px rgba(0, 0, 0, 0.6),
			inset 0 1px 1px color-mix(in oklch, var(--color-gold-light) 10%, transparent);
	}

	.achievement-glow {
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(
				circle at 85% 15%,
				color-mix(in oklch, var(--color-gold-base) 12%, transparent) 0%,
				transparent 70%
			),
			radial-gradient(
				circle at 15% 85%,
				color-mix(in oklch, var(--color-gold-base) 5%, transparent) 0%,
				transparent 50%
			);
		pointer-events: none;
		z-index: 0;
	}

	.event-type-tag {
		font-family: var(--font-heading);
		font-size: var(--text-micro);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps-wider);
		color: var(--fg-subtle);
		display: block;
		position: relative;
		z-index: 1;
	}

	.achievement .event-type-tag {
		color: var(--color-gold-base);
	}

	.event-title {
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--color-gold-light);
		position: relative;
		z-index: 1;
	}

	.achievement .event-title {
		font-size: var(--text-lead);
		line-height: var(--leading-snug);
		color: var(--fg-default);
		background: linear-gradient(to right, var(--fg-default), var(--color-gold-light));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.event-desc, .event-event {
		font-family: var(--font-serif);
		font-size: var(--text-body);
		color: var(--fg-prose);
		line-height: var(--leading-normal);
		letter-spacing: var(--tracking-ui);
		position: relative;
		z-index: 1;
		text-wrap: balance;
	}

	.achievement-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		position: relative;
		z-index: 1;
	}

	.event-place {
		font-family: var(--font-heading);
		font-weight: var(--font-weight-bold);
		color: var(--color-gold-base);
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		text-shadow: 0 0 5px rgba(0,0,0,0.5);
		position: relative;
		z-index: 1;
	}

	@media (max-width: 48rem) {
		.timeline-line {
			left: var(--space-4);
		}

		.event-marker {
			left: var(--space-4);
		}

		.event-card-container {
			width: 100%;
			padding-inline-start: var(--space-11);
			box-sizing: border-box;
			align-items: flex-start !important;
			text-align: left !important;
		}

		.event-wrapper {
			flex-direction: row !important;
		}

		.journey-container {
			max-width: 100%;
		}
	}
</style>
