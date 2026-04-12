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
	<!-- Dégradé partagé pour les pictos (référencé via url(#…), hors écran). -->
	<svg
		class="footer__icon-gradient-defs"
		aria-hidden="true"
		focusable="false"
		width="0"
		height="0"
	>
		<defs>
			<!-- Même dégradé que .footer__card (border-image : to bottom). -->
			<linearGradient
				id="footer-contact-icon-gradient"
				gradientUnits="objectBoundingBox"
				x1="0.5"
				y1="0"
				x2="0.5"
				y2="1"
			>
				<stop offset="0%" stop-color="oklch(73.5% 0.093 83.2)" />
				<stop offset="100%" stop-color="oklch(44.8% 0.094 77.1)" />
			</linearGradient>
		</defs>
	</svg>

	<SectionHeader title={i18n.t?.contact?.title} />

	<div class="footer__grid">
		<div class="footer__card">
			<div class="footer__icon footer__icon--fill">
				<svg viewBox="0 0 24 24" aria-hidden="true">
					<circle cx="4.983" cy="5.009" r="2.188" fill="url(#footer-contact-icon-gradient)" />
					<path
						fill="url(#footer-contact-icon-gradient)"
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
					stroke="url(#footer-contact-icon-gradient)"
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
			<div class="footer__icon footer__icon--fill">
				<svg viewBox="0 0 16 16" aria-hidden="true">
					<path
						fill="url(#footer-contact-icon-gradient)"
						d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011a.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0a8 8 0 0 0-.412-.833a.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02a.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595a.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085a8 8 0 0 1-1.249.594a.05.05 0 0 0-.03.03a.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019a13.2 13.2 0 0 0 4.001-2.02a.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613c0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613c0 .888-.631 1.612-1.438 1.612"
					/>
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
					stroke="url(#footer-contact-icon-gradient)"
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

	<aside class="footer__info-block">
		<div class="footer__info-item">
			<svg class="footer__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<circle cx="12" cy="12" r="10" />
				<path d="M12 6v6l4 2" />
			</svg>
			<span class="footer__info-text">{i18n.t?.contact?.replyTime}</span>
		</div>

		<div class="footer__info-row">
			<div class="footer__info-item footer__info-item--highlight">
				<span class="footer__info-label">{i18n.t?.contact?.availability}:</span>
				<span class="footer__info-text">{i18n.t?.contact?.availabilityValue}</span>
			</div>

			<div class="footer__info-item footer__info-item--highlight">
				<span class="footer__info-label">{i18n.t?.contact?.drivingLicense}:</span>
				<span class="footer__info-text">{i18n.t?.contact?.drivingLicenseValue}</span>
			</div>
		</div>

		<div class="footer__info-item">
			<svg class="footer__info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
				<circle cx="12" cy="10" r="3" />
			</svg>
			<span class="footer__info-text">{i18n.t?.contact?.location}</span>
		</div>
	</aside>
</footer>

<style>
	.site-footer {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
		align-items: center;
		padding-block: var(--spacing-xl);
	}

	.footer__icon-gradient-defs {
		position: absolute;
		overflow: hidden;
		width: 0;
		height: 0;
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

		.footer__info-row {
			flex-direction: column;
		}
	}

	.footer__info-block {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-md) var(--spacing-lg);
		width: 100%;
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 35%, transparent);
		border: var(--border-hairline) solid color-mix(in oklch, var(--color-gold-dark) 25%, transparent);
		position: relative;
		z-index: 1;
	}

	.footer__info-row {
		display: flex;
		gap: var(--spacing-lg);
	}

	.footer__info-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.footer__info-item--highlight .footer__info-label {
		font-family: var(--font-heading);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--color-magic-base);
		font-weight: var(--font-weight-bold);
	}

	.footer__info-item--highlight .footer__info-text {
		color: var(--fg-ui);
	}

	.footer__info-icon {
		width: var(--space-5);
		height: var(--space-5);
		flex-shrink: 0;
		color: var(--color-magic-base);
	}

	.footer__info-text {
		font-family: var(--font-body);
		font-size: var(--text-ui-sm);
		line-height: var(--leading-ui);
		color: var(--fg-muted);
	}
</style>
