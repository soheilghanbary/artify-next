import { TextLine } from '@/components/common/text-line'
import { OAuth } from '@/components/features/AuthModal/OAuth'
import { getToken } from '@/helpers/token'
import { redirect } from 'next/navigation'

export default async () => {
  const token = await getToken()

  if (token) {
    return redirect('/')
  }

  return (
    <div className="mx-auto my-8 flex max-w-md flex-col gap-4">
      <h1 className="text-center font-medium text-base/normal tracking-tight md:text-lg/snug">
        Sign In your Account
      </h1>
      <TextLine text="Sign in with" />
      <OAuth />
    </div>
  )
}
