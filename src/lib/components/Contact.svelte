<script lang="ts">
	import Button from './Button.svelte';
	import { i18n } from '$lib/i18n.svelte';

	let copied = $state(false);

	async function copyToClipboard(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}

	const linkedinUrl = 'https://www.linkedin.com/in/théo-menini-43695b298/';
	const discordTag = 'atom.0601';
	const emailAddress = 'theo.menini@gmail.com';
</script>

<section id="contact" class="portfolio-section container">
	<header class="section-header-unified">
		<div class="header-line left"></div>
		<h2>{i18n.t?.contact?.title}</h2>
		<div class="header-line right"></div>
	</header>

	<div class="contact-grid">
		<!-- LinkedIn -->
		<div class="contact-card">
			<div class="card-info">
				<span class="card-label">LinkedIn</span>
				<span class="card-value">Théo Menini</span>
			</div>
			<div class="card-action">
				<Button href={linkedinUrl} target="_blank"
					>{i18n.locale === 'fr' ? 'Se connecter' : 'Connect'}</Button
				>
			</div>
		</div>

		<!-- Discord -->
		<div class="contact-card">
			<div class="card-info">
				<span class="card-label">Discord</span>
				<span class="card-value">{discordTag}</span>
			</div>
			<div class="card-action">
				<Button onclick={() => copyToClipboard(discordTag)}>
					<span class:is-copied={copied}>
						{copied ? i18n.t?.contact?.copied : i18n.locale === 'fr' ? 'Copier le tag' : 'Copy tag'}
					</span>
				</Button>
			</div>
		</div>

		<!-- Email -->
		<div class="contact-card">
			<div class="card-info">
				<span class="card-label">Email</span>
				<span class="card-value">{emailAddress}</span>
			</div>
			<div class="card-action">
				<Button href={`mailto:${emailAddress}`}
					>{i18n.locale === 'fr' ? 'Envoyer un mail' : 'Send message'}</Button
				>
			</div>
		</div>
	</div>
</section>

<style>
	/* Local Contact Grid Styles */
	.contact-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18.75rem, 1fr));
		gap: var(--spacing-lg);
		width: 100%;
		max-width: 68.75rem;
	}

	.contact-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing-lg) var(--spacing-md);
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent),
			color-mix(in oklch, var(--color-bg-base) 80%, transparent)
		);
		border: 0.125rem solid;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			oklch(44.8% 0.094 77.1)
		);
		border-image-slice: 1;
		text-decoration: none;
		color: inherit;
		overflow: hidden;
	}

	.card-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: var(--spacing-md);
		position: relative;
		z-index: 1;
	}

	.card-label {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-magic-base);
	}

	.card-value {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: var(--color-text-primary);
		text-align: center;
	}

	.card-action {
		position: relative;
		z-index: 1;
	}

	.is-copied {
		color: var(--color-magic-base);
		font-weight: bold;
	}

	@media (max-width: 48rem) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
