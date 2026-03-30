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
				<p class="section-subtitle">{i18n.t?.about?.subtitle}</p>
			</header>

			<div class="bio-card">
				<p>{i18n.t?.about?.bio}</p>
			</div>

			<div class="stats-grid">
				<div class="stat-item">
					<span class="stat-label">Role</span>
					<span class="stat-value">Head Coach</span>
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

	.section-subtitle {
		font-style: italic;
		color: var(--color-text-secondary);
	}

	.bio-card {
		padding: var(--spacing-md);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: 0.125rem solid;
		border-image: linear-gradient(
			to bottom,
			oklch(73.5% 0.093 83.2),
			oklch(44.8% 0.094 77.1)
		);
		border-image-slice: 1;
		margin-bottom: var(--spacing-lg);
	}

	.bio-card p {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--color-text-primary);
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
