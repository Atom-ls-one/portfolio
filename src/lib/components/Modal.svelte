<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { onMount } from 'svelte';

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
							stroke-width="2"
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
		backdrop-filter: blur(8px);
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
		border: 1px solid var(--color-gold-dark);
		width: 100%;
		max-width: 800px;
		max-height: 90vh;
		position: relative;
		display: flex;
		flex-direction: column;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
	}

	.modal-header {
		display: flex;
		align-items: center;
		padding: var(--spacing-md) var(--spacing-lg);
		border-bottom: 1px solid color-mix(in oklch, var(--color-gold-dark) 30%, transparent);
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.5rem;
		color: var(--color-gold-light);
		flex: 1;
		text-align: center;
	}

	.close-button {
		position: absolute;
		top: -12px;
		right: -12px;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: oklch(22.1% 0.015 251.7); /* Matching Button.svelte background */
		border: 2px solid var(--color-gold-dark);
		color: var(--color-gold-base);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all var(--transition-fast);
		box-shadow: 
			inset 0 0 2px rgba(0, 0, 0, 1),
			0 4px 12px rgba(0, 0, 0, 0.8);
		z-index: 10;
		padding: 0;
	}

	.close-button:hover {
		color: var(--color-gold-light);
		border-color: var(--color-gold-base);
		background: linear-gradient(
			to bottom,
			oklch(22.1% 0.015 251.7),
			oklch(33.1% 0.032 94.6)
		);
		box-shadow: 
			inset 0 0 2px rgba(0, 0, 0, 1),
			0 0 12px color-mix(in oklch, var(--color-gold-base) 40%, transparent);
		outline: none;
	}

	.close-button svg {
		width: 16px;
		height: 16px;
		filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
	}

	.modal-content {
		padding: var(--spacing-lg);
		overflow-y: auto;
		flex: 1;
	}

	/* Scrollbar for modal content */
	.modal-content::-webkit-scrollbar {
		width: 8px;
	}

	.modal-content::-webkit-scrollbar-track {
		background: transparent;
	}

	.modal-content::-webkit-scrollbar-thumb {
		background: var(--color-gold-dark);
		border-radius: 4px;
	}

	@media (max-width: 768px) {
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
