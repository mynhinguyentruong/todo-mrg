import Link from "next/link";

import EditAndDeleteButton from "./edit-delete-button";
import { Todo, TodoList } from "@/app/types/db";
import CompletedTask from "./completed-task";
import AddIcon from "@/components/icons/add-icon";
import TaskIcon from "@/components/icons/task-icon";
import SparkleIcon from "./icons/sparkle-icon";


type NoTaskYetProps = {
    todolist: TodoList,
    completedTodos: Todo[]
}

export default function NoTaskYet({todolist, completedTodos}: NoTaskYetProps) {
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* <!-- Card --> */}
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className=" rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                            {/* <!-- Header --> */}
                            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex items-center">
                                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {todolist.title}
                                    </h2>
                                    <EditAndDeleteButton listId={todolist.id} />
                                </div>
                        
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                Create tasks, edit and more.
                                </p>
                            </div>
                            {/* <!-- End Header -->

                            <!-- Body --> */}
                            <div className="max-w-sm w-full min-h-[400px] flex flex-col justify-center mx-auto px-6 py-4">
                                <div className="flex justify-center items-center w-[46px] h-[46px] bg-gray-100 rounded-md dark:bg-gray-800">
                                  <TaskIcon/>
                                </div>

                                <h2 data-testid="no-task-header" className="mt-5 font-semibold text-gray-800 dark:text-white">
                                No task yet
                                </h2>

                                <p data-testid="no-task-paragraph" className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Add your to-dos and keep track of them across Workspace.
                                </p>

                                <div className="mt-5 grid sm:flex gap-2">
                                    <Link data-testid="newtask-button" href={`/new/${todolist.id}`} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-400 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        <AddIcon/>
                                        Create a new task
                                    </Link>
                                </div>

                                <div className="mt-3 grid sm:flex gap-2">
                                    <Link data-testid="newtask-button" href={`/new/${todolist.id}/ai`} className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        <SparkleIcon /> 
                                        Generate tasks with AI 
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- End Body -->

                            <!-- Footer --> */}
                            <CompletedTask completedTodos={completedTodos}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Card --> */}
        </div>
    )
}
