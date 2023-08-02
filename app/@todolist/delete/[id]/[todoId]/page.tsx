import Modal, { DeleteListOrTask, Frame } from "@/components/modal";

export default function Delete({params}: {params: { id: string, todoId: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    console.log({params});
    
    return (
        <Modal>
            <DeleteListOrTask todoId={params.todoId} listId={params.id} />
        </Modal>
    )
}