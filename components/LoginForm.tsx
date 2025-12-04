'use client'

import { useActionState, useState } from 'react'
import { loginAction } from '@/actions/login-action'
import Link from 'next/link'
import { useTranslations } from 'next-intl' // 👈 Importamos el hook

export default function LoginForm() {
  const t = useTranslations('Auth') // 👈 Cargamos la sección 'Auth'
  const [state, action, isPending] = useActionState(loginAction, { error: null })
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t('emailLabel')}
        </label>
        <input 
          name="email" 
          type="email" 
          placeholder={t('placeholders.email')} 
          required 
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" 
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {t('passwordLabel')}
        </label>
        
        <div className="relative">
          <input 
            name="password" 
            type={showPassword ? "text" : "password"} 
            placeholder={t('placeholders.password')} 
            required 
            className="w-full rounded-md border border-gray-300 pl-3 pr-10 py-2 text-black focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" 
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {/* ... (SVG del ojo igual que antes) ... */}
             {showPassword ? (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
             ) : (
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             )}
          </button>
        </div>

        <div className="mt-1 flex justify-end">
           <Link href="/forgot-password" className="text-xs text-green-600 hover:underline">
             {t('forgotPassword')}
           </Link>
        </div>
      </div>

      {state?.error && (
        <div className="rounded-md bg-red-50 p-2 text-sm text-red-500 border border-red-200 text-center">
          {state.error}
        </div>
      )}

      <button type="submit" disabled={isPending}
        className={`w-full rounded-md px-4 py-2 font-bold text-white transition-colors ${isPending ? 'bg-green-300' : 'bg-green-600 hover:bg-green-700'}`}>
        {isPending ? t('verifying') : t('loginBtn')}
      </button>
    </form>
  )
}