import Modal, { DeleteListOrTask } from "@/components/modal";

export default function Delete({params}: {params: { id: string, todoId: string }}) {
    
    return (
        <Modal>
            <DeleteListOrTask todoId={parseInt(params.todoId)} listId={parseInt(params.id)} />
        </Modal>
    )
}