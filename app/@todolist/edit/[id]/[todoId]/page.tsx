import { getATodo } from "@/app/action";
import Modal, { EditListOrTask } from "@/components/modal";


export default async function Edit({params}: {params: { id: string, todoId: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    const todo = await getATodo(parseInt(params.todoId))
    
    return (
        <Modal>
          <EditListOrTask todo={todo} list={null} /> 
        </Modal>
    )
}