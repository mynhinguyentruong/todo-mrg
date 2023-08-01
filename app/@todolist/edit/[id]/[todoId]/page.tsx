import Modal, { Frame } from "@/components/modal";

export default function Delete({params}: {params: { id: string, todoId: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    console.log({params});
    
    return (
        <Modal>
           <button>Edit {params.id} {params.todoId}</button> 
        </Modal>
    )
}