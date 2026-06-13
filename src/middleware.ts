import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const encoder = new TextEncoder()

async function verifySignature(sessionText: string, signature: string, secretStr: string) {
  try {
    const keyBuf = encoder.encode(secretStr)
    const msgBuf = encoder.encode(sessionText)
    const key = await crypto.subtle.importKey(
      'raw',
      keyBuf,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    )
    const sigBuf = await crypto.subtle.sign('HMAC', key, msgBuf)
    const expectedSig = Array.from(new Uint8Array(sigBuf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    return signature === expectedSig
  } catch (e) {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const adminCookie = request.cookies.get('admin_auth')?.value
  let isValid = false

  if (adminCookie) {
    const parts = adminCookie.split(':')
    if (parts.length === 3) {
      const [type, timestamp, signature] = parts
      if (type === 'session') {
        const time = parseInt(timestamp, 10)
        // 7 days limit check
        if (!isNaN(time) && Date.now() - time < 1000 * 60 * 60 * 24 * 7) {
          const secret = process.env.ADMIN_PASSWORD || 'default_butt_karahi_pass'
          const isVerified = await verifySignature(`session:${timestamp}`, signature, secret)
          if (isVerified) {
            isValid = true
          }
        }
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!isValid) {
      // Clear invalid cookie and redirect
      const response = NextResponse.redirect(new URL('/admin', request.url))
      response.cookies.delete('admin_auth')
      return response
    }
  }

  if (request.nextUrl.pathname === '/admin') {
    if (isValid) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
