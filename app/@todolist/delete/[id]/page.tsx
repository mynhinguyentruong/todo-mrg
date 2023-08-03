import Modal, { DeleteListOrTask } from "@/components/modal";

export default function Delete({params}: {params: { id: string }}) {
    return (
        <Modal>
            <DeleteListOrTask listId={parseInt(params.id)} />
        </Modal>
    )
}