<script lang="ts">
	import { fade, scale } from 'svelte/transition';

	interface Props {
		isOpen: boolean;
		onClose: () => void;
		title?: string;
		children?: any;
	}

	let { isOpen, onClose, title, children }: Props = $props();

	// Close on Escape key
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && isOpen) {
			onClose();
		}
	}

	// Prevent scrolling when modal is open
	$effect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="modal-backdrop" onclick={onClose} transition:fade={{ duration: 200 }}>
		<div
			class="modal-container"
			onclick={(e) => e.stopPropagation()}
			transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}
		>
			<div class="modal-header">
				{#if title}
					<h2>{title}</h2>
				{/if}
				<button class="close-button" onclick={onClose} aria-label="Close modal">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path
							d="M18 6L6 18M6 6l12 12"
							stroke="currentColor"
							stroke-width="3"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			</div>
			<div class="modal-content">
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: color-mix(in oklch, var(--color-bg-base) 80%, transparent);
		backdrop-filter: blur(var(--space-2));
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: var(--spacing-md);
	}

	.modal-container {
		background: linear-gradient(
			135deg,
			color-mix(in oklch, var(--color-bg-surface) 95%, white 2%),
			var(--color-bg-base)
		);
		border: var(--border-default) solid;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			oklch(44.8% 0.094 77.1)
		);
		border-image-slice: 1;
		width: 100%;
		max-width: var(--container-modal);
		max-height: 90vh;
		position: relative;
		display: flex;
		flex-direction: column;
		box-shadow: 0 var(--space-7) var(--space-13) calc(-1 * var(--space-3)) rgba(0, 0, 0, 0.5);
	}

	.modal-header {
		display: flex;
		align-items: center;
		padding: var(--spacing-md) var(--spacing-lg);
		border-bottom: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
	}

	.modal-header h2 {
		margin: 0;
		font-size: var(--text-modal-title);
		line-height: var(--leading-tight);
		color: var(--color-gold-light);
		flex: 1;
		text-align: center;
	}

	.close-button {
		position: absolute;
		top: calc(-1 * var(--space-3));
		right: calc(-1 * var(--space-3));
		width: var(--size-close-button);
		height: var(--size-close-button);
		border-radius: 50%;

		/* Exact match from Button.svelte */
		background: oklch(22.1% 0.015 251.7); /* #1e2328 */
		color: oklch(79.4% 0.065 92.5); /* #cdbe91 */
		border: var(--border-default) solid oklch(73.5% 0.093 83.2); /* Using the primary gold from Button's border-image */
		box-shadow:
			inset 0 0 var(--border-default) oklch(0% 0 0),
			0 0 var(--space-2) rgba(0, 0, 0, 0.8),
			0 var(--space-1) var(--space-3) rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.1s,
			text-shadow 0.1s,
			box-shadow 0.1s,
			color 0.1s;
		z-index: 10;
		padding: 0;
	}

	.close-button:hover {
		background: linear-gradient(
			to bottom,
			oklch(22.1% 0.015 251.7),
			oklch(33.1% 0.032 94.6)
		);
		text-shadow: 0 0 0.3125rem oklch(100% 0 0 / 0.5); /* #ffffff80 */
		box-shadow:
			inset 0 0 var(--border-default) oklch(0% 0 0),
			0 0 var(--space-2) rgba(0, 0, 0, 0.9);
		outline: none;
	}

	.close-button:active {
		text-shadow: none;
		box-shadow: inset 0 0 var(--border-default) oklch(0% 0 0);
		color: oklch(79.4% 0.065 92.5 / 0.19); /* #cdbe9130 */
	}

	.close-button svg {
		width: var(--size-icon-close-inner);
		height: var(--size-icon-close-inner);
	}

	.modal-content {
		padding: var(--spacing-lg);
		overflow-y: auto;
		flex: 1;
	}

	/* Scrollbar for modal content */
	.modal-content::-webkit-scrollbar {
		width: var(--space-2);
	}

	.modal-content::-webkit-scrollbar-track {
		background: transparent;
	}

	.modal-content::-webkit-scrollbar-thumb {
		background: var(--color-gold-dark);
		border-radius: var(--radius-xs);
	}

	@media (max-width: 48rem) {
		.modal-container {
			max-height: 100vh;
			height: 100%;
			border: none;
		}

		.modal-header {
			padding: var(--spacing-md);
		}

		.modal-content {
			padding: var(--spacing-md);
		}
	}
</style>
