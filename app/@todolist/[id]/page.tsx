import { Todo } from "@/app/types/db";
import AddIcon from "@/components/icons/add-icon";
import CompletedTask from "@/components/completed-task";
import EditAndDeleteButton from "@/components/edit-delete-button";
import { TodoComponent } from "@/components/modal";
import NoTaskYet from "@/components/no-task-yet";
import { findOneTodoList } from "@/lib/storage/TodoListRepository";
import { findAllInList } from "@/lib/storage/TodoRepository";

import Link from "next/link";

export default async function Page({params}: { params: { id: string }}) {
    const id = parseInt(params.id)
    const results: Todo[] = await findAllInList(id)
    const todolist = await findOneTodoList(id)

    if (!todolist) throw new Error(`Cannot find todo list with id ${params.id} `)
 
    const completedTodos: Todo[] = results.reduce((acc: Todo[], curr: Todo) => {
        curr.completed && acc.push(curr)
        return acc
    },[])

    const incompletedTodos: Todo[] | [] = results.reduce((acc: Todo[], curr: Todo) => {
        !curr.completed && acc.push(curr)
        return acc
    },[])

    if (results.length === 0 || incompletedTodos.length === 0 ) {
        return <NoTaskYet todolist={todolist} completedTodos={completedTodos}/>
    }
    return (
        <>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto ">
            {/* <!-- Card --> */}
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className=" rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            {/* <!-- Header --> */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <div>
                                    <div className="flex">
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        {todolist.title}
                                        </h2>
                                        <EditAndDeleteButton listId={parseInt(params.id)} />
                                    </div>
                                    
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Create tasks, edit and more.
                                    </p>
                                </div>
                                
                            </div>
                            {/* <!-- End Header -->

                            <!-- Body --> */}
                            <div className="max-w-xl w-full min-h-[400px] flex flex-col justify-center mx-auto px-6 py-4 ">
                                {/* A todo */}
                                <ul data-testid="incompleted-todos" className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                                    {incompletedTodos.map(todo => <TodoComponent key={todo.id} todo={todo}/>)}
                                    <li className="inline-flex items-center gap-x-2 py-3 text-sm font-medium text-gray-800 dark:text-white">
                                        <Link href={`/new/${params.id}`} className="flex items-center">
                                            <AddIcon/>
                                            <span className="px-3">New task</span>
                                        </Link>
                                    </li>
                                </ul> 
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            <CompletedTask completedTodos={completedTodos} />
        </div>
        </>
    )
}

export const dynamicParams = true
