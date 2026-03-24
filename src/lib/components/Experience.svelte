<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';

	const timeline = [
		{
			year: '2012',
			title: { en: "Summoner's Rift", fr: 'Premiers Pas' },
			desc: { en: 'Beginner journey as a player', fr: 'Début de l’aventure en tant que joueur' }
		},
		{
			year: '2020',
			title: { en: 'Team Alkya', fr: 'Team Alkya' },
			desc: { en: 'First coaching experience', fr: 'Première expérience de coaching' }
		},
		{
			year: '2025',
			title: { en: 'Antic Esport', fr: 'Antic Esport' },
			desc: { en: 'Assistant Coach & Analyst', fr: 'Assistant Coach & Analyste' }
		}
	];
</script>

<section id="experience" class="portfolio-section container">
	<header class="section-header-unified">
		<div class="header-line left"></div>
		<h2>{i18n.t.experience.title}</h2>
		<div class="header-line right"></div>
	</header>

	<div class="timeline-container">
		<div class="timeline" style="--items-count: {timeline.length}">
			{#each timeline as item (item.year)}
				<div class="timeline-item">
					<div class="timeline-year">{item.year}</div>
					<div class="timeline-marker">
						<div class="timeline-crystal"></div>
					</div>
					<div class="timeline-content">
						<h3 class="timeline-title">{item.title[i18n.locale]}</h3>
						<p class="timeline-desc">{item.desc[i18n.locale]}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.timeline-container {
		width: 100%;
		max-width: 68.75rem;
		margin-top: var(--spacing-xl);
	}

	.timeline {
		display: grid;
		grid-template-columns: repeat(var(--items-count, 3), 1fr);
		grid-template-rows: auto 1.25rem auto;
		row-gap: var(--spacing-md);
		position: relative;
		padding-block: var(--spacing-xl);
	}

	.timeline::before {
		content: '';
		grid-row: 2;
		grid-column: 1 / -1;
		align-self: center;
		height: 0.0625rem;
		background: linear-gradient(
			to right,
			transparent 0%,
			var(--color-gold-dark) 10%,
			var(--color-gold-base) 50%,
			var(--color-gold-dark) 90%,
			transparent 100%
		);
		z-index: 0;
		pointer-events: none;
	}

	.timeline-item {
		display: grid;
		grid-template-rows: subgrid;
		grid-row: 1 / 4;
		justify-items: center;
		text-align: center;
		position: relative;
		z-index: 1;
	}

	.timeline-year {
		grid-row: 1;
		font-family: var(--font-heading);
		font-size: 0.875rem;
		color: var(--color-magic-base);
		letter-spacing: 0.2em;
		font-weight: bold;
		min-height: 1.5em;
	}

	.timeline-marker {
		grid-row: 2;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 1.25rem;
	}

	.timeline-crystal {
		width: 0.75rem;
		height: 0.75rem;
		background: var(--color-gold-base);
		transform: rotate(45deg);
		border: 0.0625rem solid var(--color-gold-light);
		box-shadow: 0 0 0.9375rem var(--color-gold-base);
		position: relative;
	}

	.timeline-crystal::after {
		content: '';
		position: absolute;
		inset: -0.3125rem;
		border: 0.0625rem solid color-mix(in oklch, var(--color-gold-dark) 50%, transparent);
		transform: rotate(45deg);
	}

	.timeline-content {
		grid-row: 3;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		max-width: 15.625rem;
	}

	.timeline-title {
		font-size: 1.125rem;
		color: var(--color-gold-light);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.timeline-desc {
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	@media (max-width: 48rem) {
		.timeline {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-xl);
			padding-left: 1.875rem;
			padding-block: 0;
		}

		.timeline::before {
			position: absolute;
			width: 0.0625rem;
			height: 100%;
			top: 0;
			left: 0.25rem;
			right: auto;
			transform: none;
			background: linear-gradient(
				to bottom,
				transparent 0%,
				var(--color-gold-dark) 10%,
				var(--color-gold-base) 50%,
				var(--color-gold-dark) 90%,
				transparent 100%
			);
		}

		.timeline-item {
			display: flex;
			flex-direction: row;
			text-align: left;
			align-items: flex-start;
			gap: var(--spacing-lg);
		}

		.timeline-year {
			order: 1;
			min-width: 3.75rem;
			margin-top: 0.25rem;
		}

		.timeline-marker {
			order: 0;
			margin-top: 0.5rem;
		}

		.timeline-content {
			order: 2;
			max-width: 100%;
		}

		.timeline-year {
			position: absolute;
			left: 1.875rem;
			top: -0.25rem;
		}

		.timeline-content {
			margin-top: 1.5rem;
		}
	}
</style>
