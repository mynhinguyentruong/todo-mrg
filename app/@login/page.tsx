import { SignIn } from '@/components/auth-action-client';

export default async function Home() {

  return (
    <>
      <h1 className='my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Please sign in to continue</h1>
      <SignIn />
    </>
  )
}
