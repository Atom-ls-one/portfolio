<script lang="ts">
	import WorkExamples from '$lib/components/WorkExamples.svelte';
	import Button from '$lib/components/Button.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import { base } from '$app/paths';
</script>

<div class="history-page section-lol-bg section-lol-bg--collection">
	<nav class="history-nav container">
		<Button href="{base}/">{i18n.t?.common?.back}</Button>
	</nav>

	<main class="history-main">
		<WorkExamples />
	</main>
</div>

<style>
	.history-page {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		padding-top: var(--spacing-xl);
		min-height: 100vh;
	}

	.history-nav {
		display: flex;
		justify-content: flex-start;
	}

	.history-main {
		display: block;
		min-width: 0;
	}
</style>
