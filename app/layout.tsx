import { getAllTodoLists, getOrCreateUser } from '@/db'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TodoList from '@/components/todo-list'
import Link from 'next/link'
import { SessionProvider } from "next-auth/react"
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Track your todos',
}

export default async function RootLayout({
  children,
  todolist
}: {
  children: React.ReactNode,
  todolist: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session === null) {
    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col justify-center items-center` }>{children}</body>
      </html>
    ) 
  }

  const user = await getOrCreateUser({ name: session?.user?.name, email: session?.user?.email})
  // session: {
  //   user: {
  //     name: 'Nhi',
  //     email: 'mynhinguyentruong@gmail.com',
  //     image: 'https://avatars.githubusercontent.com/u/64499617?v=4'
  //   }
  // }
  const results = await getAllTodoLists(user.id)

    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen` }>
          
          <div
      className="relative bg-gray-50 dark:bg-slate-900 w-screen h-screen pattern"
  >
      <nav
      className="z-20 max-h-64 overflow-y-auto overscroll-contain flex grow-0 shrink justify-between gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[32px] flex-col rounded-lg border"
      >
          {results?.map(list => <TodoList key={list.id} list={list} />)}
  
      <hr className="dark:border-gray-700/60" />
  
      <Link
          href="/new"
          className="flex aspect-square min-h-[64px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
      >
      {/* <!-- HeroIcon - Home Modern --> */}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
  
          <small className="text-xs font-medium">New list</small>
      </Link>
      </nav>
      <div className="">
          {todolist}
      </div>
  </div>
        </body>
      </html>
    )
  
}
