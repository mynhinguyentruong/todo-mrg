import Modal, { DeleteListOrTask } from "@/components/modal";

export default function Delete({params}: {params: { id: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    return (
        <Modal>
            <DeleteListOrTask listId={parseInt(params.id)} />
        </Modal>
    )
}