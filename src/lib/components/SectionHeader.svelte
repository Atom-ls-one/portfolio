<script lang="ts">
	interface Props {
		title: string;
		as?: 'h1' | 'h2' | 'h3';
		className?: string;
	}

	let { title, as = 'h2', className = '' }: Props = $props();
</script>

<header class="section-header-unified {className}">
	<div class="header-line left"></div>
	<svelte:element this={as}>{title}</svelte:element>
	<div class="header-line right"></div>
</header>
