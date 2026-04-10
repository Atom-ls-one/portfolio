<script lang="ts">
	import { championSquareSrc } from '$lib/utils/champion-assets';

	interface Props {
		championId: string;
		championName: string;
		/** Carte liste (cercle + lazy + initiale secours) ou en-tête modal (carré). */
		variant: 'card' | 'modal';
	}

	let { championId, championName, variant }: Props = $props();

	const src = $derived(championSquareSrc(championId));
</script>

{#if variant === 'card'}
	<div class="champion-portrait champion-portrait--card">
		<img {src} alt={championName} class="champion-portrait__img" loading="lazy" />
		<span class="champion-portrait__fallback" aria-hidden="true">{championName[0]}</span>
	</div>
{:else}
	<div class="champion-portrait champion-portrait--modal">
		<img {src} alt={championName} class="champion-portrait__img" />
	</div>
{/if}

<style>
	.champion-portrait--card {
		position: relative;
		width: var(--size-champion-thumb);
		height: var(--size-champion-thumb);
		border-radius: 50%;
		border: var(--border-default) solid var(--color-gold-base);
		overflow: hidden;
		background: var(--color-bg-base);
		box-shadow: 0 0 0.9375rem color-mix(in oklch, var(--color-gold-base) 20%, transparent);
		flex-shrink: 0;
	}

	.champion-portrait--card .champion-portrait__img {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.champion-portrait--card .champion-portrait__fallback {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-heading);
		font-size: var(--text-champion-glyph);
		line-height: var(--leading-none);
		color: var(--color-magic-base);
		font-weight: var(--font-weight-bold);
		z-index: 1;
	}

	.champion-portrait--modal {
		width: var(--space-17);
		height: var(--space-17);
		border: var(--border-default) solid var(--color-gold-base);
		overflow: hidden;
		box-shadow: 0 0 var(--space-6) color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
	}

	.champion-portrait--modal .champion-portrait__img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
