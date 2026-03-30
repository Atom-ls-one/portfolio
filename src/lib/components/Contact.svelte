<script lang="ts">
	import Button from './Button.svelte';
	import { i18n } from '$lib/i18n.svelte';
	import SectionHeader from './SectionHeader.svelte';
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
	const twitterUrl = 'https://x.com/ls_atom';
	const discordTag = 'atom.0601';
	const emailAddress = 'theo.menini@hotmail.fr';
</script>

<section id="contact" class="portfolio-section container">
	<SectionHeader title={i18n.t?.contact?.title} />

	<div class="contact-grid">
		<!-- LinkedIn -->
		<div class="contact-card">
			<div class="card-icon">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
				</svg>
			</div>
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

		<!-- Twitter -->
		<div class="contact-card">
			<div class="card-icon">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
				</svg>
			</div>
			<div class="card-info">
				<span class="card-label">Twitter / X</span>
				<span class="card-value">@ls_atom</span>
			</div>
			<div class="card-action">
				<Button href={twitterUrl} target="_blank"
					>{i18n.locale === 'fr' ? 'Suivre' : 'Follow'}</Button
				>
			</div>
		</div>

		<!-- Discord -->
		<div class="contact-card">
			<div class="card-icon">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.125-.094.249-.192.37-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.37.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.332.955-2.418 2.157-2.418 1.21 0 2.175 1.096 2.157 2.418 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.332.955-2.418 2.157-2.418 1.21 0 2.175 1.096 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z"/>
				</svg>
			</div>
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
			<div class="card-icon">
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
				</svg>
			</div>
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
		grid-template-columns: repeat(4, 1fr);
		gap: var(--spacing-md);
		width: 100%;
		max-width: var(--container-max-width);
	}

	.contact-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing-lg) var(--spacing-xs);
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
		gap: 0.25rem;
		margin-bottom: var(--spacing-md);
		position: relative;
		z-index: 1;
	}

	.card-icon {
		width: 2.5rem;
		height: 2.5rem;
		margin-bottom: var(--spacing-sm);
		color: var(--color-gold-base);
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
		font-size: 1.125rem;
		color: var(--color-text-primary);
		text-align: center;
		word-break: break-word;
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
