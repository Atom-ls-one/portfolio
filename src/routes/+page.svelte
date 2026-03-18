<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import MatchHistory from '$lib/components/MatchHistory.svelte';
	import Contact from '$lib/components/Contact.svelte';
</script>

<main class="portfolio-main">
	<Hero />
	<About />
	<Experience />
	<MatchHistory limit={3} />
	<Contact />
</main>

<style>
	.portfolio-main {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow-x: hidden;
	}

	/* Global pseudo-element background decoration applied to main to give unity */
	.portfolio-main::after {
		content: '';
		position: fixed;
		inset: 0;
		background: radial-gradient(
			circle at top left,
			color-mix(in oklch, var(--color-magic-base) 5%, transparent),
			transparent 40%
		);
		pointer-events: none;
		z-index: -1;
	}
</style>
