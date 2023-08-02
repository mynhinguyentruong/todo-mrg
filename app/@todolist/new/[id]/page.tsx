import Modal, { NewTask } from "@/components/modal";
import { TodoList, getATodoList } from "@/db";

export default async function New({ params }: { params: { id: string }}) {
    // get authorId
    const todoList: TodoList = await getATodoList(params.id)
    console.log({todoList});
    
    return (
        <Modal>
           <NewTask todoList={todoList} /> 
        </Modal>
    )
}