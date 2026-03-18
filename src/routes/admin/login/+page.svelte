<script lang="ts">
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import { auth } from '$lib/firebase/config';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { base } from '$app/paths';

	let email = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	async function handleLogin() {
		loading = true;
		error = '';
		try {
			await signInWithEmailAndPassword(auth, email, password);
			goto(`${base}/admin`);
		} catch (err: any) {
			error = err.message;
		} finally {
			loading = false;
		}
	}
</script>

<div class="login-container">
	<div class="login-card">
		<header class="section-header-unified">
			<div class="header-line left"></div>
			<h2>Admin Login</h2>
			<div class="header-line right"></div>
		</header>

		<form
			onsubmit={(e) => {
				e.preventDefault();
				handleLogin();
			}}
			class="login-form"
		>
			<div class="form-group">
				<label for="email">Email</label>
				<input type="email" id="email" bind:value={email} required />
			</div>

			<div class="form-group">
				<label for="password">Password</label>
				<input type="password" id="password" bind:value={password} required />
			</div>

			{#if error}
				<p class="error-msg">{error}</p>
			{/if}

			<Button type="submit" disabled={loading} className="w-full">
				{loading ? 'Authenticating...' : 'Login'}
			</Button>
		</form>
	</div>
</div>

<style>
	.login-container {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--spacing-md);
	}

	.login-card {
		width: 100%;
		max-width: 400px;
		padding: var(--spacing-xl);
		background: color-mix(in oklch, var(--color-bg-surface) 40%, transparent);
		border: 1px solid var(--color-gold-dark);
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-lg);
		margin-top: var(--spacing-xl);
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.form-group label {
		font-family: var(--font-heading);
		font-size: 0.75rem;
		text-transform: uppercase;
		color: var(--color-magic-base);
	}

	.form-group input {
		padding: 12px;
		background: var(--color-bg-base);
		border: 1px solid var(--color-gold-dark);
		color: var(--color-text-primary);
		font-family: inherit;
	}

	.form-group input:focus {
		outline: none;
		border-color: var(--color-gold-base);
		box-shadow: 0 0 5px var(--color-gold-base);
	}

	.error-msg {
		color: #ff4e50;
		font-size: 0.875rem;
		text-align: center;
	}

	:global(.w-full) {
		width: 100%;
	}
</style>
