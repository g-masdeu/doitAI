'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  // 1. Accedemos a las cookies
  const cookieStore = await cookies()

  // 2. Eliminamos la cookie del token
  cookieStore.delete('session_token')

  // 3. Redirigimos a la home
  redirect('/')
}