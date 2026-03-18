<script lang="ts">
	import MatchHistory from '$lib/components/MatchHistory.svelte';
	import Button from '$lib/components/Button.svelte';
	import { i18n } from '$lib/i18n.svelte';
</script>

<div class="history-page">
	<nav class="history-nav container">
		<Button href="/">
			{i18n.locale === 'fr' ? 'Retour' : 'Back'}
		</Button>
	</nav>

	<main>
		<MatchHistory />
	</main>
</div>

<style>
	.history-page {
		padding-top: var(--spacing-xl);
		min-height: 100vh;
		background: var(--color-bg-base);
	}

	.history-nav {
		margin-bottom: var(--spacing-lg);
		display: flex;
		justify-content: flex-start;
	}
</style>
