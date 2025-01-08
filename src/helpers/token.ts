'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const setToken = async (token: string) => {
  const cookie = await cookies()
  cookie.set('token', token, {
    maxAge: 60 * 60 * 24 * 7, // یک هفته به ثانیه
    path: '/', // مسیر کوکی
    httpOnly: false, // برای امنیت بیشتر
    // secure: process.env.NODE_ENV === 'production', // فقط در محیط تولید از HTTPS استفاده شود
    sameSite: 'lax', // یا 'strict' برای امنیت بیشتر
  })
  redirect('/')
}

export const getToken = async () => {
  const cookie = await cookies()
  return cookie.get('token')?.value!
}
