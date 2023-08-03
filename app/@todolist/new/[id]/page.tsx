import { getATodoList } from "@/app/action";
import { TodoList } from "@/app/types/db";
import Modal, { NewTask } from "@/components/modal";

export default async function New({ params }: { params: { id: string }}) {
    // get authorId
    const todoList: TodoList = await getATodoList(parseInt(params.id))
  
    return (
        <Modal>
           <NewTask todoList={todoList} /> 
        </Modal>
    )
}