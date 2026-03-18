<script lang="ts">
	import Button from './Button.svelte';
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
	</div>

	<div class="container hero__content">
		<header class="hero__header">
			<h1 id="hero-title" class="hero__title">
				<span class="hero__first-name">Théo</span>
				<strong class="hero__gamertag">Atom</strong>
				<span class="hero__last-name">Menini</span>
			</h1>
			<p class="hero__subtitle">{i18n.t.hero.catchphrase}</p>
		</header>

		<div class="hero__actions">
			<Button href="#projects">{i18n.t.hero.btn1}</Button>
			<Button href="#contact">{i18n.t.hero.btn2}</Button>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: 100vh;
		display: grid;
		align-items: center;
		overflow: hidden;
		padding-block: var(--spacing-xl);
		border-bottom: 2px solid var(--color-gold-dark);
		background-color: var(--color-bg-base);
	}

	.hero__video-container {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.hero__video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.6;
		filter: grayscale(0.5) contrast(1.1);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 115vw; /* Oversized to hide edges */
		height: 115vh;
		pointer-events: none;
	}

	.hero__overlay {
		position: absolute;
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
		bottom: -2px;
		left: 0;
		right: 0;
		height: 4px;
		background: linear-gradient(
			90deg,
			transparent,
			var(--color-gold-light),
			var(--color-gold-base),
			transparent
		);
		z-index: 10;
	}

	.hero__content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: var(--spacing-xl);
		margin-top: -5vh;
	}

	.hero__header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.hero__title {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.3em;
		line-height: 1;
		font-size: clamp(2rem, 6vw, 5rem);
		color: var(--color-text-primary);
		text-shadow: 0 4px 10px color-mix(in oklch, var(--color-bg-base) 90%, transparent);
	}

	.hero__subtitle {
		font-family: var(--font-heading);
		font-size: clamp(1rem, 2.5vw, 1.5rem);
		color: var(--color-magic-base);
		font-style: normal;
		font-weight: 500;
		letter-spacing: 0.05em;
		opacity: 0.9;
		margin-top: var(--spacing-xs);
	}

	.hero__first-name,
	.hero__last-name {
		font-weight: 400;
		color: var(--color-gold-light);
	}

	.hero__gamertag {
		display: inline;
		font-size: inherit;
		color: var(--color-gold-light);
		font-weight: 600;
	}

	.hero__actions {
		display: flex;
		gap: var(--spacing-md);
		flex-wrap: wrap;
		justify-content: center;
	}
</style>
