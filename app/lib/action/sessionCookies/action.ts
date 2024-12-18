'use server';

import { cookies } from 'next/headers';

export async function deleteCookies() {
  (await cookies()).delete('session');
}
