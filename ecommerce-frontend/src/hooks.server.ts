import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const protectedRoutes = ['/orders'];

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get('session');

  const isProtectedRoute = protectedRoutes.some(route => event.url.pathname.startsWith(route));

  if (isProtectedRoute && !session) {
    throw redirect(302, `/login?redirectTo=${event.url.pathname}`);
  }

  const response = await resolve(event);
  return response;
};