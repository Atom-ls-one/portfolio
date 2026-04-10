<script lang="ts">
	interface Props {
		title: string;
		subtitle?: string;
		as?: 'h1' | 'h2' | 'h3';
		className?: string;
	}

	let { title, subtitle, as = 'h2', className = '' }: Props = $props();
</script>

<header class="section-header-unified {className}">
	<div class="header-line left"></div>
	<div class="section-header-unified__center">
		<svelte:element this={as} class="section-header-unified__heading">{title}</svelte:element>
		{#if subtitle}
			<p class="section-header-unified__subtitle">{subtitle}</p>
		{/if}
	</div>
	<div class="header-line right"></div>
</header>
