import { TodoList } from "@/app/types/db";
import Modal, { NewTask } from "@/components/modal";
import { findOneTodoList } from "@/lib/storage/TodoListRepository";

export default async function New({ params }: { params: { id: string }}) {
    // get authorId
    const todoList: TodoList = await findOneTodoList(parseInt(params.id))
  
    return (
        <Modal>
           <NewTask todoList={todoList} /> 
        </Modal>
    )
}