"use client"
import clsx from "clsx"
import { useState } from "react"
import { TodoComponent } from "./modal"
import type { Todo } from "@/app/types/db"
import { Toaster, toast } from "sonner"

export default function CompletedTask({completedTodos}: { completedTodos: Todo[] | []}) {
    const [isHidden, setIsHidden] = useState(true)

    const markIncompleted = () => {
        toast("Hiiiii")
    } 
    return (
        <>
            <Toaster position="top-center" richColors/>
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mx-3">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{completedTodos.length}</span> completed
                </p>
                <button 
                onClick={() => setIsHidden(!isHidden)}
                className="hover:bg-red-200 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </button>
            
                </div>
            </div>
            <ul className={clsx({hidden: isHidden},"max-h-32 mx-auto max-w-lg overflow-scroll flex flex-col divide-y divide-gray-200 dark:divide-gray-70" )}>
                {completedTodos?.map((todo: Todo) => (<TodoComponent key={todo.id} todo={todo} />))}
            </ul>
        </>
    )
}