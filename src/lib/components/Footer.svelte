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
			<div class="footer__icon">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
					<path d="M8 11l0 5" />
					<path d="M8 8l0 .01" />
					<path d="M12 16l0 -5" />
					<path d="M16 16v-3a2 2 0 0 0 -4 0" />
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
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M8 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
					<path d="M14 12a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
					<path
						d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-.972 1.923a11.913 11.913 0 0 0 -4.053 0l-.975 -1.923c-1.5 .16 -3.043 .485 -4.5 1.5c-2 5.667 -2.167 9.833 -1.5 11.5c.667 1.333 2 3 3.5 3c.5 0 2 -2 2 -3"
					/>
					<path d="M7 16.5c3.5 1 6.5 1 10 0" />
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
		stroke-width: 1px;
		vector-effect: non-scaling-stroke;
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
