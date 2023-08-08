'use client'

import React, { useCallback, useRef, useEffect, MouseEventHandler, useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createTodo, deleteTodo, updateTodo } from '@/lib/storage/TodoRepository'
import clsx from 'clsx'
import EditAndDeleteButton from '@/components/edit-delete-button'
import { Todo, TodoList, User } from '@/app/types/db'
import { createTodoList, deleteTodoList, updateTodoList } from '@/lib/storage/TodoListRepository'
import {  toast } from 'sonner'

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null)
  const wrapper = useRef(null)
  const router = useRouter()

  const onDismiss = useCallback(() => {
    router.back()
  }, [router])

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  )

  useEffect(() => {
    document.addEventListener('keydown', () => onKeyDown)
    return () => document.removeEventListener('keydown', () => onKeyDown)
  }, [onKeyDown])

  return (
    <div
      ref={overlay}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6"
      >
        {children}
      </div>
    </div>
  )
}



export function NewTask({ todoList }: { todoList: TodoList}) {
    const router = useRouter()

    const [title, setTitle] = useState("")
    const todo: Omit<Todo, "id" | "completed"> = {
      authorId: todoList.authorId,
      content: title,
      title: todoList.title,
      listId: todoList.id
    }
    
    const add = async() => {
      await createTodo(todo)
      router.refresh()
      router.push(`/${todoList.id}`)
    }
    
    return (
      <>
       <div className="m-8 my-20 max-w-[400px] mx-auto rounded-lg">
       <div className="px-6 py-6 lg:px-8 bg-slate-50">
                <h3 className="mb-4 text-xl font-medium text-gray-900  rounded-lg">Create new task</h3>
                <form className="space-y-6" >
                    <div>
                        <input 
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" placeholder="New task" required/>
                    </div>
                   
                    <button
                        formAction={add} 
                        className="w-full text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-600 dark:focus:ring-red-800"
                        >Done
                    </button>
                    
                </form>
            </div>
      </div>
      </>
    )
  }

type ListOrTask = {
  list?: TodoList | null,
  todo?: Todo | null
}


export function EditListOrTask({ list, todo }: ListOrTask) {
    const router = useRouter()
    const [title, setTitle] = useState(list?.title || todo?.content || "")

    const type = list ? 'list' : 'task'

    async function update() {
      if (title === '') {
        alert('Cannot update value to an empty string')
        return;
      }

      if (todo && title) {
        await updateTodo(todo.id, { content: title }) 

        router.refresh()
        router.push(`/${todo.listId}`)
        return;
      }

      if (list && title) {
        await updateTodoList(list.id, {title})

        router.refresh()
        router.push(`/${list.id}`)
        return 
      }
    }

    return (
       <div className="m-8 my-20 max-w-[400px] mx-auto sm:rounded-2xl bg-white p-10">
       <div className="">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white rounded-lg">Edit {type}</h3>
                <form className="space-y-6" >
                    <div>
                        <input 
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter list title" required/>
                    </div>
                   
                   
                    <button
                        formAction={update} 
                        className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-700 dark:focus:ring-800"
                        >Done
                    </button>
                    
                </form>
            </div>
      </div>
    )
  }
export function CreateNewTodoList({user}: { user: User }) {
    const router = useRouter()
    const [title, setTitle] = useState("")

    const create = async () => {
      if (!title) return

      const { id } = await createTodoList(title, user.id)
      router.refresh()
      router.push(`/${id}`)
    }

    return (
      <>
       <div className="m-8 my-20 max-w-[400px] mx-auto sm:rounded-2xl bg-white p-10">
       <div className="px-6 py-6 lg:px-8 ">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white rounded-lg">Create new list</h3>
                <form className="space-y-6" >
                    <div>
                        <input 
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-500 focus:border-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black" placeholder="Enter list title" required/>
                    </div>
                    <button
                        formAction={create} 
                        className="w-full text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                        >Done
                    </button>
                    
                </form>
            </div>
      </div>
      </>
    )
  }

export function DeleteListOrTask({listId, todoId}: { listId: number; todoId?: number}) {
  const router = useRouter()

  const deleteTask = async () => {
    if (todoId) {
      await deleteTodo(todoId)
      router.refresh()
      router.push(`/${listId}`)
      return;
    }
    await deleteTodoList(listId)

    router.refresh()
    router.push('/')
  }

  return (
           <div className="m-8 my-20 max-w-[400px] mx-auto sm:rounded-2xl bg-white p-10">
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-extrabold">Delete task</h1>
                    <p className="text-gray-600">Are you sure you want to delete this task?</p>
                </div>
                <div className="space-y-4">
                    <button
                      onClick={deleteTask} 
                      className="p-3 bg-red-500 rounded-full text-white w-full font-semibold hover:bg-red-700">Delete</button>
                    <button 
                      onClick={() => router.back()}
                      className="p-3 bg-white border rounded-full w-full font-semibold hover:bg-slate-100">Cancel</button>
                </div>
            </div>
  )
}

export function TodoComponent({todo}: { todo: Todo }) {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const setTodoCompleted = async() => {
    setIsClicked(true)
    if (!todo.completed) toast.success("Task completed")
    if (todo.completed) toast.success("Task marked incompleted")
    await updateTodo(todo.id, { completed: !todo.completed })
    router.refresh()
  }

  return (
    <li 
      className={clsx("inline-flex items-center justify-between gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white", { hidden: isClicked })}>

      <button 
        onClick={setTodoCompleted}>{todo.content}</button>
      <EditAndDeleteButton listId={todo.listId} todoId={todo.id}/>
    </li>
  )
}
