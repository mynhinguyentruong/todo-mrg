import Todo from '@/components/todo';
import { getAllTodos } from '@/db';
import Image from 'next/image'
import { SignIn } from './auth-action-client';

export default async function Home() {
  let session = {user: "haha@gmail.com"};
  const todos = await getAllTodos(1)
  // return (
  //   <main className="flex ">
      
  //     {session?.user ? (
  //       <Todo />
  //     ) : (
  //       <SignIn />
  //     )
  //     }
  //   </main>
  // )

  return (
    <>
    <h1 className='my-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Please sign in to continue</h1>
    <SignIn />
  </>)
}
