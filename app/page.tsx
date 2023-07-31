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
    <h1>Start create, edit your todo list</h1>
  )
}
