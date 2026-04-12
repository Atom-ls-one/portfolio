<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import profileImg from '$lib/assets/images/profile-2.jpg';
</script>

<section id="about" class="about-section container section-lol-bg section-lol-bg--collection">
	<div class="about-grid">
		<div class="about-visual">
			<img
				src={profileImg}
				alt="Théo Atom Menini"
				class="about-profile-img"
				width="800"
				height="1200"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="about-content">
			<header class="section-header">
				<p class="about-eyebrow">{i18n.t?.about?.title}</p>
				<h2>Théo <span class="text-gold">&ldquo;Atom&rdquo;</span> Menini</h2>
			</header>

			<div class="about-main">
				<div class="bio-container">
					<div class="bio-card">
						{#each (i18n.t?.about?.bio ?? '')
							.split(/\n\n+/)
							.map((s) => s.trim())
							.filter(Boolean) as para, i (i)}
							<p>{para}</p>
						{/each}
					</div>
				</div>

				<aside class="faq-aside" aria-label={i18n.t?.about?.faqLabel}>
					<span class="faq-label">{i18n.t?.about?.faqLabel}</span>
					{#each i18n.t.about.faq as item (item.q)}
						<details class="faq-item">
							<summary>
								<span class="faq-chevron" aria-hidden="true">›</span>
								<span class="faq-q">{item.q}</span>
							</summary>
							<div class="faq-answer">
								<p>{item.a}</p>
							</div>
						</details>
					{/each}
				</aside>
			</div>

			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-label">{i18n.t?.about?.stats?.role}</span>
					<span class="stat-value">{i18n.t?.hero?.role}</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">{i18n.t?.about?.stats?.experience}</span>
					<span class="stat-value">{i18n.t?.about?.stats?.experienceValue}</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">{i18n.t?.about?.stats?.region}</span>
					<span class="stat-value">{i18n.t?.about?.stats?.regionValue}</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		padding-block: var(--spacing-xl);
	}

	:global(.about-section)::before {
		background-attachment: fixed, fixed !important;
	}

	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 40%) minmax(0, 1fr);
		gap: var(--space-about-grid-gap);
		/* Photo : hauteur intrinsèque (ratio), pas étirée sur toute la colonne texte. */
		align-items: start;
	}

	/* Même encadrement que les FAQ (dégradé + bordure dorée type client). */
	.about-visual {
		position: relative;
		width: 100%;
		max-width: 100%;
		/* Occupe toute la colonne (~40 %) ; ratio source 2:3, plafond pour ne pas « manger » tout l’écran. */
		aspect-ratio: 2 / 3;
		max-height: min(72vh, 46rem);
		overflow: hidden;
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent),
			color-mix(in oklch, var(--color-bg-base) 80%, transparent)
		);
		border-style: solid;
		border-width: var(--border-default);
		border-image: linear-gradient(to bottom, oklch(73.5% 0.093 83.2), oklch(44.8% 0.094 77.1));
		border-image-slice: 1;
	}

	.about-profile-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* Ancrage un peu plus bas dans le fichier pour remonter le sujet (évite d’être collé en bas du cadre). */
		object-position: 48% 28%;
		display: block;
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.section-header h2 {
		font-size: var(--text-display-sm);
	}

	.about-eyebrow {
		margin: 0;
		font-family: var(--font-heading);
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--color-magic-base);
	}

	.text-gold {
		color: var(--color-gold-light);
	}

	.about-content {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		min-width: 0;
		/* gap uniforme = trop d’air titre ↔ bio ; marges séparées ci-dessous */
		gap: 0;
		/* ~65–75 caractères (mesure éditoriale) pour les paragraphes descriptifs */
		--about-prose-measure: 70ch;
	}

	.about-content > .section-header {
		margin-block-end: var(--space-about-title-to-bio);
	}

	.about-content > .about-main {
		margin-block-end: var(--space-about-content-y);
	}

	/* Remplit l’espace vertical entre le titre et les stats (aligné avec la hauteur du portrait). */
	.about-main {
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		gap: var(--space-about-main-y);
		min-width: 0;
	}

	.bio-container {
		min-width: 0;
	}

	.bio-card {
		padding: 0;
		position: relative;
	}

	.bio-card p {
		margin: 0;
		max-width: var(--about-prose-measure);
		font-family: var(--font-serif);
		font-size: var(--text-lead);
		line-height: var(--leading-body);
		color: var(--fg-prose);
		text-wrap: balance;
		letter-spacing: var(--tracking-normal);
	}

	.bio-card p + p {
		margin-top: var(--spacing-sm);
	}

	.faq-aside {
		--faq-disclosure-duration: 320ms;
		--faq-chevron-width: var(--space-7);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		text-align: start;
		min-width: 0;
	}

	.faq-label {
		font-family: var(--font-heading);
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps-wider);
		color: var(--fg-subtle);
	}

	.faq-item {
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 60%, transparent),
			color-mix(in oklch, var(--color-bg-base) 80%, transparent)
		);
		border-style: solid;
		border-width: var(--border-default);
		border-image: linear-gradient(to bottom, oklch(73.5% 0.093 83.2), oklch(44.8% 0.094 77.1));
		border-image-slice: 1;
		transition:
			background var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	/* Accordion FAQ : hauteur en ease-in-out (navigateurs récents ; sinon ouverture instantanée). */
	@media (prefers-reduced-motion: no-preference) {
		@supports (interpolate-size: allow-keywords) and selector(details::details-content) {
			.faq-item {
				interpolate-size: allow-keywords;
			}

			.faq-item::details-content {
				overflow: hidden;
				height: 0;
				transition-behavior: allow-discrete;
				transition-property: height, content-visibility;
				transition-duration: var(--faq-disclosure-duration);
				transition-timing-function: ease-in-out;
			}

			.faq-item[open]::details-content {
				height: auto;
			}
		}
	}

	.faq-item:hover {
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 72%, transparent),
			color-mix(in oklch, var(--color-bg-base) 88%, transparent)
		);
		box-shadow: inset 0 0 var(--border-default) oklch(0% 0 0);
	}

	.faq-item[open] {
		background: linear-gradient(
			180deg,
			color-mix(in oklch, var(--color-bg-surface) 68%, transparent),
			color-mix(in oklch, var(--color-bg-base) 84%, transparent)
		);
	}

	.faq-item summary {
		list-style: none;
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-3a);
		cursor: pointer;
		font-family: var(--font-body);
		font-size: var(--text-ui);
		font-weight: var(--font-weight-medium);
		line-height: var(--leading-ui);
		color: var(--fg-ui);
		user-select: none;
	}

	.faq-item summary::-webkit-details-marker {
		display: none;
	}

	.faq-item summary:focus {
		outline: none;
	}

	.faq-item summary:focus-visible {
		outline: var(--space-focus-outline) solid var(--color-magic-base);
		outline-offset: var(--space-focus-offset);
		border-radius: var(--radius-sm);
	}

	.faq-chevron {
		flex-shrink: 0;
		width: var(--faq-chevron-width);
		text-align: center;
		font-size: var(--text-lead);
		line-height: var(--leading-snug);
		color: var(--color-magic-base);
		transition: transform var(--faq-disclosure-duration) ease-in-out;
	}

	.faq-item[open] .faq-chevron {
		transform: rotate(90deg);
	}

	.faq-q {
		flex: 1;
		min-width: 0;
	}

	.faq-answer {
		display: flex;
		flex-direction: column;
		gap: var(--space-2-5);
		padding: var(--space-2-5) var(--space-3a) var(--space-3)
			calc(var(--space-3a) + var(--faq-chevron-width) + var(--space-2));
		border-top: var(--border-hairline) solid
			color-mix(in oklch, var(--color-gold-dark) 70%, transparent);
	}

	.faq-answer p {
		max-width: var(--about-prose-measure);
		margin: 0;
		font-family: var(--font-body);
		font-size: var(--text-body);
		line-height: var(--leading-body);
		letter-spacing: var(--tracking-ui);
		color: var(--fg-muted);
		text-wrap: pretty;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--spacing-md);
		flex-shrink: 0;
		padding-top: var(--spacing-md);
		border-top: var(--border-hairline) solid
			color-mix(in oklch, var(--color-gold-dark) 28%, transparent);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.stat-label {
		font-size: var(--text-overline);
		line-height: var(--leading-ui);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps);
		color: var(--fg-subtle);
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: var(--text-stat-value);
		line-height: var(--leading-snug);
		color: var(--color-gold-light);
	}

	@media (min-width: 75rem) {
		.about-grid {
			gap: var(--space-about-grid-gap-lg);
		}
	}

	@media (min-width: 100rem) {
		.about-grid {
			gap: var(--space-about-grid-gap-xl);
		}
	}

	@media (max-width: 60.5rem) {
		.about-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-xl);
			text-align: center;
		}

		.about-visual {
			width: min(100%, var(--about-visual-max));
			aspect-ratio: 2 / 3;
			max-height: min(58vh, 34rem);
			margin-inline: auto;
		}

		.section-header {
			align-items: center;
		}

		.about-main {
			align-items: stretch;
		}

		.bio-container {
			max-width: var(--about-bio-max);
			margin-inline: auto;
			text-align: start;
		}

		.faq-aside {
			max-width: var(--about-faq-max);
			width: 100%;
			margin-inline: auto;
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
			text-align: start;
		}

		.stat-item {
			align-items: center;
			text-align: center;
		}
	}
</style>
