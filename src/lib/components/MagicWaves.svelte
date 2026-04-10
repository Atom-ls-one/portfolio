<script lang="ts">
	let { variant = 'backdrop' }: { variant?: 'backdrop' | 'hero' } = $props();
</script>

<div class="magic-waves magic-waves--{variant}" aria-hidden="true">
	<div class="magic-waves__layer magic-waves__layer--a"></div>
	<div class="magic-waves__layer magic-waves__layer--b"></div>
	<div class="magic-waves__layer magic-waves__layer--c"></div>
	<div class="magic-waves__layer magic-waves__layer--d"></div>
</div>

<style>
	.magic-waves--backdrop {
		position: fixed;
		inset: 0;
		z-index: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.magic-waves--hero {
		position: absolute;
		inset: 0;
		z-index: 2;
		overflow: hidden;
		pointer-events: none;
	}

	.magic-waves__layer {
		position: absolute;
		will-change: transform, opacity;
		mix-blend-mode: screen;
	}

	/* Bande horizontale large — drift lent */
	.magic-waves__layer--a {
		width: 160%;
		height: 42%;
		left: -30%;
		top: 28%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse 55% 45% at 50% 50%,
			color-mix(in oklch, var(--color-magic-glow) 55%, transparent) 0%,
			color-mix(in oklch, var(--color-magic-base) 22%, transparent) 45%,
			transparent 72%
		);
		filter: blur(72px);
		opacity: 0.42;
		animation: magic-wave-a 28s ease-in-out infinite;
	}

	.magic-waves__layer--b {
		width: 140%;
		height: 38%;
		left: -35%;
		top: 48%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse 50% 40% at 40% 50%,
			color-mix(in oklch, var(--color-magic-base) 45%, transparent) 0%,
			color-mix(in oklch, var(--color-magic-glow) 18%, transparent) 50%,
			transparent 68%
		);
		filter: blur(88px);
		opacity: 0.35;
		animation: magic-wave-b 36s ease-in-out infinite;
		animation-delay: -8s;
	}

	/* Halo haut — respiration */
	.magic-waves__layer--c {
		width: 85%;
		height: 55%;
		left: 7%;
		top: -12%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse 70% 60% at 50% 0%,
			color-mix(in oklch, var(--color-magic-glow) 35%, transparent) 0%,
			transparent 65%
		);
		filter: blur(64px);
		opacity: 0.3;
		animation: magic-pulse 22s ease-in-out infinite;
		animation-delay: -4s;
	}

	/* Traînée bas-droite */
	.magic-waves__layer--d {
		width: 70%;
		height: 50%;
		right: -18%;
		bottom: -5%;
		border-radius: 50%;
		background: radial-gradient(
			ellipse 55% 50% at 70% 60%,
			color-mix(in oklch, var(--color-magic-base) 38%, transparent) 0%,
			transparent 70%
		);
		filter: blur(76px);
		opacity: 0.28;
		animation: magic-wave-d 32s ease-in-out infinite;
		animation-delay: -14s;
	}

	@keyframes magic-wave-a {
		0%,
		100% {
			transform: translate3d(-4%, 0, 0) scaleX(1);
			opacity: 0.38;
		}
		33% {
			transform: translate3d(6%, -3%, 0) scaleX(1.06);
			opacity: 0.48;
		}
		66% {
			transform: translate3d(2%, 2%, 0) scaleX(0.98);
			opacity: 0.42;
		}
	}

	@keyframes magic-wave-b {
		0%,
		100% {
			transform: translate3d(5%, 0, 0) scale(1);
			opacity: 0.3;
		}
		50% {
			transform: translate3d(-8%, 4%, 0) scale(1.05, 1.02);
			opacity: 0.4;
		}
	}

	@keyframes magic-pulse {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
			opacity: 0.22;
		}
		50% {
			transform: translate3d(2%, 3%, 0) scale(1.12);
			opacity: 0.38;
		}
	}

	@keyframes magic-wave-d {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
			opacity: 0.24;
		}
		40% {
			transform: translate3d(-6%, -5%, 0);
			opacity: 0.36;
		}
		70% {
			transform: translate3d(4%, 2%, 0);
			opacity: 0.3;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.magic-waves__layer {
			animation: none;
			will-change: auto;
		}

		.magic-waves__layer--a {
			opacity: 0.32;
			transform: translate3d(0, 0, 0);
		}

		.magic-waves__layer--b {
			opacity: 0.26;
			transform: translate3d(0, 0, 0);
		}

		.magic-waves__layer--c {
			opacity: 0.22;
			transform: translate3d(0, 0, 0);
		}

		.magic-waves__layer--d {
			opacity: 0.2;
			transform: translate3d(0, 0, 0);
		}
	}
</style>
