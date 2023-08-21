import { TodoList } from "@/app/types/db";
import Modal, { AIPrompt } from "@/components/modal";
import { findOneTodoList } from "@/lib/storage/TodoListRepository";

export default async function New({ params }: { params: { id: string }}) {
    const todoList: TodoList = await findOneTodoList(parseInt(params.id))
  
    return (
        <Modal>
           <AIPrompt todoList={todoList} /> 
        </Modal>
    )
}
