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

{#if adminAuth.loading}
	<div class="admin-loading">
		<p>Initializing Session...</p>
	</div>
{:else}
	<div class="admin-layout">
		{@render children()}
	</div>
{/if}

<style>
	.admin-loading {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: var(--font-heading);
		color: var(--color-gold-base);
	}

	.admin-layout {
		min-height: 100vh;
		background: var(--color-bg-base);
		color: var(--color-text-primary);
	}
</style>
