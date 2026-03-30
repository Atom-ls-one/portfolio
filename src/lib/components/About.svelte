<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import profileImg from '$lib/assets/images/profile.png';
</script>

<section id="about" class="about-section container">
	<div class="about-grid">
		<div class="about-visual">
			<div class="profile-ring">
				<img src={profileImg} alt="Théo Atom Menini" class="profile-img" width="320" height="320" />
			</div>
			<div class="visual-decor"></div>
		</div>

		<div class="about-content">
			<header class="section-header">
				<span class="section-tag">{i18n.t?.about?.title}</span>
				<h2>Théo <span class="text-gold">Atom</span> Menini</h2>

			</header>

			<div class="bio-container">
				<span class="bio-label">{i18n.locale === 'fr' ? 'À propos' : 'About Me'}</span>
				<div class="bio-card">
					<p>{i18n.t?.about?.bio}</p>
				</div>
			</div>

			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-label">Role</span>
					<span class="stat-value">{i18n.locale === 'fr' ? 'Coach / Analyste' : 'Coach / Analyst'}</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Experience</span>
					<span class="stat-value">5+ Years</span>
				</div>
				<div class="stat-item">
					<span class="stat-label">Region</span>
					<span class="stat-value">Europe (EUW)</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.about-section {
		padding-block: var(--spacing-xl);
		position: relative;
	}

	.about-grid {
		display: grid;
		grid-template-columns: 1fr 1.5fr;
		gap: var(--spacing-xl);
		align-items: center;
	}

	.about-visual {
		position: relative;
		display: flex;
		justify-content: center;
	}

	.profile-ring {
		width: clamp(200px, 25vw, 320px);
		height: clamp(200px, 25vw, 320px);
		border-radius: 50%;
		padding: 6px;
		background: linear-gradient(
			135deg,
			var(--color-gold-light),
			var(--color-gold-base),
			var(--color-gold-dark)
		);
		z-index: 2;
	}

	.profile-img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		border: 4px solid var(--color-bg-base);
	}

	.section-header {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-lg);
	}

	.section-tag {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		text-transform: uppercase;
		letter-spacing: 0.2em;
		color: var(--color-magic-base);
	}

	.text-gold {
		color: var(--color-gold-light);
	}

	.bio-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-lg);
	}

	.bio-label {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		color: var(--color-magic-base);
		opacity: 0.8;
	}

	.bio-card {
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: 1px solid;
		border-image: linear-gradient(
			to bottom,
			var(--color-gold-light),
			var(--color-gold-dark)
		) 1;
		margin-bottom: var(--spacing-lg);
		position: relative;
		box-shadow: 
			inset 0 0 20px color-mix(in oklch, var(--color-gold-base) 2%, transparent),
			0 10px 30px -10px rgba(0, 0, 0, 0.4);
	}

	.bio-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--color-gold-base), transparent);
	}

	.bio-card p {
		font-family: 'Marcellus', serif;
		font-size: 1.2rem;
		line-height: 1.8;
		color: var(--color-text-secondary);
		text-wrap: balance;
		letter-spacing: 0.02em;
	}

	.bio-card p::first-letter {
		float: left;
		font-family: var(--font-heading);
		font-size: 3.5rem;
		line-height: 1;
		padding-right: 0.5rem;
		color: var(--color-gold-base);
		text-shadow: 0 0 10px color-mix(in oklch, var(--color-gold-base) 30%, transparent);
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.stat-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
	}

	.stat-value {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		color: var(--color-gold-light);
	}

	@media (max-width: 968px) {
		.about-grid {
			grid-template-columns: 1fr;
			text-align: center;
		}

		.profile-ring {
			width: 240px;
			height: 240px;
		}

		.section-header {
			align-items: center;
		}

		.bio-card {
			border-left: 1px solid var(--color-gold-dark);
			border-top: 4px solid var(--color-gold-base);
		}

		.stats-grid {
			grid-template-columns: 1fr;
			gap: var(--spacing-sm);
		}
	}
</style>
