<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import { register } from '$lib/services/api';

    let username = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
    let error = '';
    let loading = false;

    async function handleSubmit() {
        loading = true;
        error = '';
        if (password !== confirmPassword) {
            error = 'Passwords do not match';
            loading = false;
            return;
        }
        try {
            await register(username, email, password);
            goto('/login');
        } catch (err) {
            error = 'An error occurred. Please try again.';
            console.error(error);
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Register | Your E-commerce Store</title>
</svelte:head>

<div class="container mt-5" in:fade={{ duration: 300, delay: 300 }}>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow" in:fly={{ y: 20, duration: 300, delay: 300 }}>
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Create an Account</h2>
                    <p class="text-center mb-4">Please fill in the details to register</p>
                    <form on:submit|preventDefault={handleSubmit}>
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" bind:value={username} required>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" bind:value={email} required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" bind:value={password} required>
                        </div>
                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                            <input type="password" class="form-control" id="confirmPassword" bind:value={confirmPassword} required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    {#if error}
                        <div class="alert alert-danger mt-3" role="alert" in:fade>
                            {error}
                        </div>
                    {/if}
                    <div class="text-center mt-3">
                        <a href="/login" class="text-decoration-none">Already have an account? Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
