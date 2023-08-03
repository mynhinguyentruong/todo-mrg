import { Todo } from "@/app/types/db";
import Modal, { EditListOrTask } from "@/components/modal";
import { getOneTodo } from "@/lib/storage/TodoRepository";


export default async function Edit({params}: {params: { id: string, todoId: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    const todo = (await getOneTodo(parseInt(params.todoId))) as Todo
    
    return (
        <Modal>
          <EditListOrTask todo={todo} list={null} /> 
        </Modal>
    )
}