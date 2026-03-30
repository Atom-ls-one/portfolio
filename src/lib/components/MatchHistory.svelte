<script lang="ts">
	import Button from './Button.svelte';
	import MatchCard from './MatchCard.svelte';
	import MatchModal from './MatchModal.svelte';
	import SectionHeader from './SectionHeader.svelte';
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

	function closeMatchDetails() {
		selectedMatch = null;
	}
</script>

<section id="projects" class="portfolio-section container">
	<SectionHeader title={i18n.t?.projects?.title} />

	<div class="match-list">
		{#each displayedMatches as match (match.championId + match.kda)}
			<MatchCard {match} onViewDetails={openMatchDetails} />
		{/each}
	</div>

	{#if limit && matches.list.length > limit}
		<footer class="section-footer">
			<Button href="{base}/history" className="btn--all">
				{i18n.t?.projects?.viewAll}
			</Button>
		</footer>
	{/if}

	<MatchModal match={selectedMatch} onClose={closeMatchDetails} />
</section>

<style>
	.match-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		width: 100%;
	}

	.section-footer {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-md);
	}
</style>
