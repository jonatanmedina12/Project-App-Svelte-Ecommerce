import { browser } from '$app/environment';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { auth } from '$lib/stores/auth';

const protectedRoutes = ['/orders'];

export const load: LayoutLoad = async ({ url }) => {
  if (browser) {
    const isProtectedRoute = protectedRoutes.some(route => url.pathname.startsWith(route));

    if (isProtectedRoute && !auth.isAuthenticated) {
      throw redirect(302, `/login?redirectTo=${url.pathname}`);
    }
  }
};