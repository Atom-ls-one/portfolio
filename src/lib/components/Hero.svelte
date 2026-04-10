<script lang="ts">
	import Button from './Button.svelte';
	import MagicWaves from './MagicWaves.svelte';
	import { i18n } from '$lib/i18n.svelte';
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="hero__video-container">
		<iframe
			class="hero__video"
			src="https://www.youtube.com/embed/cIjqhw425Z4?autoplay=1&mute=1&controls=0&loop=1&playlist=cIjqhw425Z4&start=28&modestbranding=1&rel=0&iv_load_policy=3"
			title="Gameplay Background"
			frameborder="0"
			allow="autoplay; encrypted-media"
			allowfullscreen
		></iframe>
		<div class="hero__overlay"></div>
		<MagicWaves variant="hero" />
		<!-- Ornement client (CommunityDragon : circle-lines-gold.svg) -->
		<div class="hero__lol-ornament" aria-hidden="true"></div>
	</div>

	<div class="container hero__content">
		<header class="hero__header">
			<h1 id="hero-title" class="hero__title">
				<span class="hero__first-name">Théo</span>
				<strong class="hero__gamertag">Atom</strong>
				<span class="hero__last-name">Menini</span>
			</h1>
			<p class="hero__subtitle">{i18n.t?.hero?.catchphrase}</p>
		</header>

		<div class="hero__actions">
			<Button href="#projects">{i18n.t?.hero?.btn1}</Button>
			<Button href="#footer">{i18n.t?.hero?.btn2}</Button>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: grid;
		align-items: center;
		overflow: hidden;
		padding-block: var(--spacing-xl);
	}

	.hero__video-container {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.hero__video {
		position: absolute;
		z-index: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		/* Boîte 16:9 assez grande pour couvrir le viewport (évite le letterbox YouTube en portrait) */
		width: 100vw;
		height: 56.25vw;
		min-height: 100vh;
		min-height: 100dvh;
		min-width: calc(100vh * 16 / 9);
		min-width: calc(100dvh * 16 / 9);
		opacity: 0.6;
		filter: grayscale(0.5) contrast(1.1);
		pointer-events: none;
		border: 0;
	}

	.hero__lol-ornament {
		position: absolute;
		z-index: 2;
		inset: 0;
		background: url('../assets/lol-ui/circle-lines-gold.svg') center 38% / min(72vw, 24rem) no-repeat;
		opacity: 0.12;
		pointer-events: none;
	}

	.hero__overlay {
		position: absolute;
		z-index: 1;
		inset: 0;
		background: radial-gradient(
			circle at center,
			color-mix(in oklch, var(--color-bg-base) 60%, transparent) 0%,
			var(--color-bg-base) 100%
		);
	}

	.hero::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: var(--lol-section-separator-height);
		background: var(--lol-section-separator-gradient);
		z-index: 10;
		pointer-events: none;
	}

	.hero__content {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-xl);
		transform: translateY(-5vh);
	}

	.hero__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
	}

	.hero__title {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.3em;
		line-height: var(--leading-tight);
		font-size: var(--text-hero);
		color: var(--fg-default);
		letter-spacing: var(--tracking-wide);
		text-shadow: 0 4px 10px color-mix(in oklch, var(--color-bg-base) 90%, transparent);
	}

	.hero__subtitle {
		font-family: var(--font-heading);
		font-size: var(--text-hero-sub);
		line-height: var(--leading-snug);
		color: var(--color-magic-base);
		font-style: normal;
		font-weight: var(--font-weight-medium);
		letter-spacing: var(--tracking-hero-sub);
		opacity: 0.9;
	}

	.hero__first-name,
	.hero__last-name {
		font-weight: var(--font-weight-regular);
		color: var(--color-gold-light);
	}

	.hero__gamertag {
		display: inline;
		font-size: inherit;
		color: var(--color-gold-light);
		font-weight: var(--font-weight-medium);
	}

	.hero__actions {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
