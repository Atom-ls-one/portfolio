<script lang="ts">
	import Button from './Button.svelte';
	import SectionHeader from './SectionHeader.svelte';
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
	const twitterUrl = 'https://x.com/ls_atom';
	const discordTag = 'atom.0601';
	const emailAddress = 'theo.menini@hotmail.fr';
</script>

<footer id="footer" class="site-footer container section-lol-bg section-lol-bg--article">
	<SectionHeader title={i18n.t?.contact?.title} />

	<div class="footer__grid">
		<div class="footer__card">
			<div class="footer__icon footer__icon--fill">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="4.983" cy="5.009" r="2.188" fill="currentColor" />
					<path
						fill="currentColor"
						d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118c1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783c-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66zm-6.142 0H6.87v12.139H3.095z"
					/>
				</svg>
			</div>
			<div class="footer__info">
				<span class="footer__label">LinkedIn</span>
				<span class="footer__value">Théo Menini</span>
			</div>
			<div class="footer__action">
				<Button href={linkedinUrl} target="_blank">{i18n.t?.contact?.connect}</Button>
			</div>
		</div>

		<div class="footer__card">
			<div class="footer__icon">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
					<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
				</svg>
			</div>
			<div class="footer__info">
				<span class="footer__label">Twitter / X</span>
				<span class="footer__value">@ls_atom</span>
			</div>
			<div class="footer__action">
				<Button href={twitterUrl} target="_blank">{i18n.t?.contact?.follow}</Button>
			</div>
		</div>

		<div class="footer__card">
			<div class="footer__icon">
				<svg
					viewBox="0 0 48 48"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path
						d="M17.59 34.173A49 49 0 0 1 14.68 38C7.3 37.79 4.5 33 4.5 33a44.8 44.8 0 0 1 4.81-19.52A16.47 16.47 0 0 1 18.69 10l1 2.31A33 33 0 0 1 24 12a33 33 0 0 1 4.33.3l1-2.31a16.47 16.47 0 0 1 9.38 3.51A44.8 44.8 0 0 1 43.5 33s-2.8 4.79-10.18 5a47 47 0 0 1-2.86-3.81m6.46-2.9c-3.84 1.945-7.555 3.89-12.92 3.89s-9.08-1.945-12.92-3.89"
					/>
					<circle cx="17.847" cy="26.23" r="3.35" />
					<circle cx="30.153" cy="26.23" r="3.35" />
				</svg>
			</div>
			<div class="footer__info">
				<span class="footer__label">Discord</span>
				<span class="footer__value">{discordTag}</span>
			</div>
			<div class="footer__action">
				<Button onclick={() => copyToClipboard(discordTag)}>
					<span class:is-copied={copied}>
						{copied ? i18n.t?.contact?.copied : i18n.t?.contact?.copyTag}
					</span>
				</Button>
			</div>
		</div>

		<div class="footer__card">
			<div class="footer__icon">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
					<path d="M3 7l9 6l9 -6" />
				</svg>
			</div>
			<div class="footer__info">
				<span class="footer__label">Email</span>
				<span class="footer__value">{emailAddress}</span>
			</div>
			<div class="footer__action">
				<Button href={`mailto:${emailAddress}`}>{i18n.t?.contact?.sendEmail}</Button>
			</div>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
		align-items: center;
		padding-block: var(--spacing-xl);
	}

	.footer__grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: var(--spacing-md);
		width: 100%;
		max-width: var(--container-max-width);
		min-width: 0;
	}

	.footer__card {
		position: relative;
		display: flex;
		min-width: 0;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-md);
		padding: var(--spacing-lg) var(--spacing-xs);
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent),
			color-mix(in oklch, var(--color-bg-base) 80%, transparent)
		);
		border: var(--border-default) solid;
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

	.footer__card::before {
		content: '';
		position: absolute;
		inset: -8%;
		background: url('../assets/lol-ui/border-unranked.png') center / 100% 100% no-repeat;
		opacity: 0.06;
		pointer-events: none;
		z-index: 0;
	}

	.footer__info {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-1);
		position: relative;
		z-index: 1;
	}

	.footer__icon {
		position: relative;
		z-index: 1;
		width: var(--size-icon-contact);
		height: var(--size-icon-contact);
		color: var(--color-gold-base);
	}

	.footer__icon svg {
		width: 100%;
		height: 100%;
		display: block;
		stroke-width: 2px;
		vector-effect: non-scaling-stroke;
	}

	.footer__icon--fill svg {
		stroke: none;
		stroke-width: 0;
		vector-effect: none;
	}

	.footer__label {
		font-family: var(--font-heading);
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--color-magic-base);
	}

	.footer__value {
		font-family: var(--font-heading);
		font-size: var(--text-subheading);
		line-height: var(--leading-snug);
		color: var(--fg-default);
		text-align: center;
		word-break: break-word;
	}

	.footer__action {
		position: relative;
		z-index: 1;
	}

	.is-copied {
		color: var(--color-magic-base);
		font-weight: var(--font-weight-bold);
	}

	@media (max-width: 48rem) {
		.footer__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
