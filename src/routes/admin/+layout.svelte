<script lang="ts">
	import { goto } from '$app/navigation';
	import { adminAuth } from '$lib/firebase/auth.svelte';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		if (!adminAuth.loading && !adminAuth.user && page.url.pathname !== `${base}/admin/login`) {
			goto(`${base}/admin/login`);
		}
	});
</script>

<div class="admin-wrapper" class:is-loading={adminAuth.loading}>
	{#if adminAuth.loading}
		<div class="admin-loading" aria-live="polite">
			<p>Initializing Session...</p>
		</div>
	{/if}

	<div class="admin-layout">
		{@render children()}
	</div>
</div>

<style>
	.admin-wrapper {
		position: relative;
		min-height: 100vh;
	}

	.admin-loading {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-bg-base);
		font-family: var(--font-heading);
		color: var(--color-gold-base);
		z-index: 1000;
	}

	.admin-layout {
		min-height: 100vh;
		background: var(--color-bg-base);
		color: var(--color-text-primary);
		opacity: 1;
		transition: opacity 0.3s;
	}

	.admin-wrapper.is-loading .admin-layout {
		opacity: 0;
		pointer-events: none;
	}
</style>
