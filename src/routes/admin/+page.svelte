<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import { saveRemoteDict } from '$lib/firebase/data';
	import Button from '$lib/components/Button.svelte';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase/config';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let saving = $state(false);
	let message = $state({ text: '', type: '' });

	async function handleLogout() {
		await signOut(auth);
		goto(`${base}/admin/login`);
	}

	async function saveChanges() {
		saving = true;
		message = { text: '', type: '' };
		try {
			await saveRemoteDict(i18n.all);
			message = { text: 'Settings saved successfully!', type: 'success' };
		} catch (err: any) {
			message = { text: `Error: ${err.message}`, type: 'error' };
		} finally {
			saving = false;
			setTimeout(() => {
				message = { text: '', type: '' };
			}, 3000);
		}
	}

	// This is a super simplified editor for the main strings Théo would want to change often
	let editMode = $state('hero'); // 'hero' | 'about' | 'experience'
</script>

<div class="admin-dashboard container">
	<header class="admin-header">
		<div>
			<h1>Atom Dashboard</h1>
			<p>Signed in as {auth.currentUser?.email}</p>
		</div>
		<div class="header-actions">
			<Button onclick={saveChanges} disabled={saving} className="save-btn">
				{saving ? 'Syncing...' : 'Publish Changes'}
			</Button>
			<button class="logout-link" onclick={handleLogout}>Logout</button>
		</div>
	</header>

	{#if message.text}
		<div class="alert alert-{message.type}">
			{message.text}
		</div>
	{/if}

	<nav class="admin-nav">
		<button class:active={editMode === 'hero'} onclick={() => (editMode = 'hero')}
			>Hero & SEO</button
		>
		<button class:active={editMode === 'about'} onclick={() => (editMode = 'about')}
			>About & Stats</button
		>
		<button class:active={editMode === 'experience'} onclick={() => (editMode = 'experience')}
			>Professional Path</button
		>
	</nav>

	<section class="admin-content">
		{#if editMode === 'hero'}
			<div class="edit-panel">
				<h3>Hero Section (English)</h3>
				<div class="field">
					<label for="catchphrase-en">Catchphrase</label>
					<textarea id="catchphrase-en" bind:value={i18n.all.en.hero.catchphrase}></textarea>
				</div>
				<div class="field">
					<label for="seo-desc-en">SEO Description</label>
					<textarea id="seo-desc-en" bind:value={i18n.all.en.seo.description}></textarea>
				</div>

				<h3>Hero Section (French)</h3>
				<div class="field">
					<label for="catchphrase-fr">Phrase d'accroche</label>
					<textarea id="catchphrase-fr" bind:value={i18n.all.fr.hero.catchphrase}></textarea>
				</div>
				<div class="field">
					<label for="seo-desc-fr">Description SEO</label>
					<textarea id="seo-desc-fr" bind:value={i18n.all.fr.seo.description}></textarea>
				</div>
			</div>
		{:else}
			<div class="edit-panel placeholder">
				<p>
					Additional sections (Experience, History) are coming in the next update. All keys are
					currently being managed in the main dictionary.
				</p>
				<p>
					To edit other fields, click "Publish Changes" to save what you've done, and stay tuned for
					more granular controls.
				</p>
			</div>
		{/if}
	</section>
</div>

<style>
	.admin-dashboard {
		padding-block: var(--spacing-xl);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.admin-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: var(--spacing-lg);
		border-bottom: 2px solid var(--color-gold-dark);
	}

	.admin-header h1 {
		font-family: var(--font-heading);
		color: var(--color-gold-base);
		margin: 0;
	}

	.admin-header p {
		font-family: var(--font-heading);
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-top: 4px;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
	}

	.logout-link {
		color: var(--color-text-muted);
		text-transform: uppercase;
		font-size: 0.75rem;
		letter-spacing: 0.1em;
		background: none;
		border: none;
		cursor: pointer;
	}

	.logout-link:hover {
		color: #ff4e50;
	}

	.admin-nav {
		display: flex;
		gap: 2px;
		background: var(--color-gold-dark);
		padding: 2px;
	}

	.admin-nav button {
		padding: 12px 24px;
		background: var(--color-bg-base);
		color: var(--color-text-muted);
		border: none;
		cursor: pointer;
		font-family: var(--font-heading);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		font-size: 0.875rem;
		transition: all 0.2s;
	}

	.admin-nav button.active {
		background: var(--color-gold-base);
		color: var(--color-bg-base);
	}

	.edit-panel {
		padding: var(--spacing-xl);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: 1px solid var(--color-gold-dark);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xl);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.field label {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		color: var(--color-magic-base);
		text-transform: uppercase;
	}

	.field textarea {
		padding: 12px;
		background: var(--color-bg-base);
		border: 1px solid var(--color-gold-dark);
		color: var(--color-text-primary);
		min-height: 100px;
		resize: vertical;
	}

	.alert {
		padding: 12px;
		text-align: center;
		font-weight: bold;
	}

	.alert-success {
		background: #1e4d1e;
		color: #a3ffa3;
	}
	.alert-error {
		background: #4d1e1e;
		color: #ffa3a3;
	}
</style>
