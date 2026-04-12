<script lang="ts">
	import { fade } from 'svelte/transition';
	import WorkCard from './WorkCard.svelte';
	import WorkModal from './WorkModal.svelte';
	import SectionHeader from './SectionHeader.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { works, type WorkCategory, type WorkEntry } from '$lib/data/works.svelte';

	interface Props {
		limit?: number;
	}

	let { limit }: Props = $props();

	const categories: WorkCategory[] = ['scouting-report', 'reviews', 'draft-simulations'];

	let activeCategory = $state<WorkCategory>('scouting-report');
	let selectedWork = $state<WorkEntry | null>(null);

	let displayedWorks = $derived(() => {
		const filtered = works.byCategory(activeCategory);
		return limit ? filtered.slice(0, limit) : filtered;
	});

	function categoryLabel(cat: WorkCategory): string {
		const labels = i18n.t?.projects?.categories;
		if (!labels) return cat;
		const map: Record<WorkCategory, string> = {
			'scouting-report': labels.scoutingReport,
			'reviews': labels.reviews,
			'draft-simulations': labels.draftSimulations
		};
		return map[cat] ?? cat;
	}

	function openWorkDetails(work: WorkEntry) {
		selectedWork = work;
	}

	function closeWorkDetails() {
		selectedWork = null;
	}
</script>

<section id="projects" class="portfolio-section container section-lol-bg section-lol-bg--alpha">
	<SectionHeader title={i18n.t?.projects?.title} />

	<nav class="category-tabs" aria-label={i18n.t?.projects?.categoryNav}>
		{#each categories as cat (cat)}
			<button
				class="category-tab {activeCategory === cat ? 'category-tab--active' : ''}"
				onclick={() => (activeCategory = cat)}
			>
				{categoryLabel(cat)}
			</button>
		{/each}
	</nav>

	<div class="work-stack">
		{#key activeCategory}
			<div class="work-list" in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 100 }}>
				{#each displayedWorks() as work (work.id)}
					<WorkCard {work} onViewDetails={openWorkDetails} />
				{/each}

				{#if displayedWorks().length === 0}
					<p class="work-empty">{i18n.t?.projects?.empty}</p>
				{/if}
			</div>
		{/key}
	</div>

</section>

<WorkModal work={selectedWork} onClose={closeWorkDetails} />

<style>
	.category-tabs {
		display: flex;
		justify-content: center;
		gap: var(--space-1);
		position: sticky;
		top: 0;
		z-index: 50;
		padding: var(--space-2) var(--space-3);
		background: color-mix(in oklch, var(--color-bg-base) 85%, transparent);
		backdrop-filter: blur(12px);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
	}

	.category-tab {
		font-family: var(--font-heading);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		font-weight: var(--font-weight-medium);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--fg-subtle);
		padding: var(--space-2) var(--space-4);
		position: relative;
		transition:
			color var(--transition-fast),
			background var(--transition-fast);
	}

	.category-tab:hover {
		color: var(--color-gold-light);
		background: color-mix(in oklch, var(--color-gold-dark) 10%, transparent);
	}

	.category-tab--active {
		color: var(--color-gold-base);
		font-weight: var(--font-weight-bold);
	}

	.category-tab--active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: var(--space-4);
		right: var(--space-4);
		height: var(--border-default);
		background: linear-gradient(90deg, var(--color-gold-dark), var(--color-gold-light), var(--color-gold-dark));
	}

	.work-stack {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		width: 100%;
		align-items: center;
	}

	.work-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		width: 100%;
	}

	.work-empty {
		text-align: center;
		color: var(--fg-subtle);
		font-family: var(--font-serif);
		font-size: var(--text-body);
		padding: var(--spacing-lg) 0;
	}

	@media (max-width: 48rem) {
		.category-tabs {
			gap: 0;
			padding: var(--space-1) var(--space-2);
		}

		.category-tab {
			font-size: var(--text-overline);
			padding: var(--space-2) var(--space-3);
		}
	}
</style>
