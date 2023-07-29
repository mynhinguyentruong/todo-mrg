import Todo from '@/components/todo';
import Image from 'next/image'
import { SignIn } from './auth-action-client';

export default function Home() {
  let session = {user: "haha@gmail.com"};
  return (
    <main className="flex min-h-screen">
      
      {session?.user ? (
        <Todo />
      ) : (
        <SignIn />
      )
      }
    </main>
  )
}
