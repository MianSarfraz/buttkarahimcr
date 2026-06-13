'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import crypto from 'crypto'

export async function loginAdmin(formData: FormData) {
  const password = formData.get('password') as string
  const adminPassword = process.env.ADMIN_PASSWORD || 'default_butt_karahi_pass'

  if (password === adminPassword) {
    const cookieStore = cookies()
    const timestamp = Date.now().toString()
    const rawSession = `session:${timestamp}`
    const secret = adminPassword
    const signature = crypto.createHmac('sha256', secret).update(rawSession).digest('hex')
    const token = `${rawSession}:${signature}`

    cookieStore.set('admin_auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    redirect('/admin/dashboard')
  } else {
    return { error: 'Invalid password' }
  }
}

export async function logoutAdmin() {
  const cookieStore = cookies()
  cookieStore.delete('admin_auth')
  redirect('/admin')
}
