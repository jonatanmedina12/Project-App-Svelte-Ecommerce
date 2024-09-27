import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { authStore } from '$lib/stores/auth';

const protectedRoutes = ['/orders','/products'];

export const load: LayoutLoad = async ({ url }) => {
  if (browser) {
    const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));

    if (isProtectedRoute && !authStore.login) {
      throw redirect(302, `/login?redirectTo=${url.pathname}`);
    }
  }
};