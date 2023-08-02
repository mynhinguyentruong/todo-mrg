import Modal, { EditListOrTask, Frame } from "@/components/modal";
import { getATodo } from "@/db";

export default async function Edit({params}: {params: { id: string, todoId: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    const todo = await getATodo(params.todoId)
    
    return (
        <Modal>
          <EditListOrTask todo={todo} list={null} /> 
        </Modal>
    )
}