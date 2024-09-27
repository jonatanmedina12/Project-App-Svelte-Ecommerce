<script lang="ts">
    import { goto } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import { forgotPassword } from '$lib/services/api';

    let email = '';
    let error = '';
    let success = '';
    let loading = false;

    async function handleSubmit() {
        if (!email) {
            error = 'Please enter your email address.';
            return;
        }

        loading = true;
        error = '';
        success = '';

        try {
            await forgotPassword(email);
            success = 'If an account exists for this email, you will receive password reset instructions shortly.';
            email = ''; // Clear the email input after successful submission
        } catch (err) {
            error = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
        } finally {
            loading = false;
        }
    }
</script>

<svelte:head>
    <title>Forgot Password | Your E-commerce Store</title>
</svelte:head>

<div class="container mt-5" in:fade={{ duration: 300, delay: 300 }}>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow" in:fly={{ y: 20, duration: 300, delay: 300 }}>
                <div class="card-body">
                    <h2 class="card-title text-center mb-4">Forgot Password</h2>
                    <p class="text-center mb-4">Enter your email to receive password reset instructions</p>
                    <form on:submit|preventDefault={handleSubmit}>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input 
                                type="email" 
                                class="form-control" 
                                id="email" 
                                bind:value={email} 
                                required
                                disabled={loading}
                            >
                        </div>
                        <button type="submit" class="btn btn-primary w-100" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Reset Instructions'}
                        </button>
                    </form>
                    {#if error}
                        <div class="alert alert-danger mt-3" role="alert" in:fade>
                            {error}
                        </div>
                    {/if}
                    {#if success}
                        <div class="alert alert-success mt-3" role="alert" in:fade>
                            {success}
                        </div>
                    {/if}
                    <div class="text-center mt-3">
                        <a href="/login" class="text-decoration-none">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>