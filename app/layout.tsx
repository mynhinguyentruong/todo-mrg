import '@/app/globals.css'
import type { Metadata } from 'next'
import type { UserSession } from '@/app/types/session/user-session'

import { Inter } from 'next/font/google'
import TodoList from '@/components/todo-list'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { getOrCreateUser } from '@/lib/storage/UserRepository'
import { findAllTodoLists } from '@/lib/storage/TodoListRepository'
import AddIcon from '@/components/add-icon'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Track your todos',
}

export default async function RootLayout({
  children,
  todolist,
  login
}: {
  children: React.ReactNode,
  login: React.ReactNode,
  todolist: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user == null ) {
    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col justify-center items-center` }>{login}</body>
      </html>
    ) 
  }

  const user = await getOrCreateUser({ name: session.user.name, email: session.user.email} as UserSession)

  const results = await findAllTodoLists(user.id)

    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen` }>
          
          <div
            className="relative bg-gray-50 dark:bg-slate-900 w-screen h-screen pattern">
            <nav
              className="z-20 max-h-64 overflow-y-auto overscroll-contain flex grow-0 shrink justify-between gap-4 border-t border-gray-200 bg-white/50 p-1 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] w-1/14 flex-col items-center rounded-lg border">
                {results?.map(list => <TodoList key={list.id} list={list} />)}
              <hr className="dark:border-gray-700/60" />
              <Link
                  href="/new"
                  className="flex aspect-square min-h-[64px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
              >
                <AddIcon />    
                <small className="text-xs font-medium">New list</small>
              </Link>
            </nav>
            <div >
              {todolist}
            </div>
          </div>
        </body>
      </html>
    )
  
}
