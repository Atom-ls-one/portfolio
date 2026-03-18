<script lang="ts">
	import type { Snippet } from 'svelte';
	import buttonSound from '$lib/assets/sound-effects/button.mp3';
	/* eslint-disable @typescript-eslint/no-explicit-any */

	let {
		children,
		href = undefined,
		type = 'button',
		className = '',
		onclick,
		...rest
	}: {
		children: Snippet;
		href?: string;
		type?: 'button' | 'submit' | 'reset';
		className?: string;
		onclick?: (e: MouseEvent) => void;
		[key: string]: any;
	} = $props();

	function handleAction(e: MouseEvent) {
		const audio = new Audio(buttonSound);
		audio.play().catch(() => {});
		if (onclick) onclick(e);
	}
</script>

{#if href}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a {href} class="btn {className}" {...rest} onclick={handleAction}>
		{@render children()}
	</a>
{:else}
	<button {type} class="btn {className}" {...rest} onclick={handleAction}>
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		font-family: var(--font-menu-button, 'Marcellus SC', serif);
		font-size: 15px;
		font-weight: bold;
		letter-spacing: 1px;
		padding: 5px 15px;
		background: oklch(22.1% 0.015 251.7); /* #1e2328 */
		color: oklch(79.4% 0.065 92.5); /* #cdbe91 */
		box-shadow: inset 0 0 2px oklch(0% 0 0); /* #000000 */
		border-style: solid;
		border-width: 2px;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			/* #c8aa6d */ oklch(44.8% 0.094 77.1) /* #7a5c29 */
		);
		border-image-slice: 1;

		cursor: pointer;
		text-transform: uppercase;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition:
			background 0.1s,
			text-shadow 0.1s,
			box-shadow 0.1s,
			color 0.1s;
	}

	.btn:hover,
	.btn:focus-visible {
		text-shadow: 0 0 5px oklch(100% 0 0 / 0.5); /* #ffffff80 */
		box-shadow: inset 0 0 2px oklch(0% 0 0);
		background: linear-gradient(
			to bottom,
			oklch(22.1% 0.015 251.7),
			/* #1e2328 */ oklch(33.1% 0.032 94.6) /* #433d2b */
		);
		outline: none;
	}

	.btn:active {
		text-shadow: none;
		box-shadow: inset 0 0 2px oklch(0% 0 0);
		color: oklch(79.4% 0.065 92.5 / 0.19); /* #cdbe9130 */
	}
</style>
