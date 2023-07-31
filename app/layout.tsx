import { getAllTodoLists } from '@/db'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TodoList from '@/components/todo-list'
import Link from 'next/link'

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
  const results = await getAllTodoLists(1)
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen` }>
        
        <div
    className="relative bg-gray-50 dark:bg-slate-900 w-screen h-screen pattern"
>
    <nav
    className="z-20 max-h-64 overflow-y-auto overscroll-contain flex shrink-0 grow-0 justify-between gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg dark:border-slate-600/60 dark:bg-slate-800/50 fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border"
    >
        {results?.map(list => <TodoList key={list.id} list={list} />)}

    <hr className="dark:border-gray-700/60" />

    <Link
        href="/login"
        className="flex aspect-square min-h-[64px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
    >
    {/* <!-- HeroIcon - Home Modern --> */}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>

        <small className="text-xs font-medium">New list</small>
    </Link>
    </nav>
    <div className="flex flex-col border-2 items-center justify-center min-h-screen">
        {todolist}
    </div>
</div>
      </body>
    </html>
  )
}
