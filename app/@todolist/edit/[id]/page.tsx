import Modal, { Frame } from "@/components/modal";

export default function Edit({params}: {params: { id: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    console.log({params});
    
    return (
        <Modal>
           <button>Edit {params.id} </button> 
        </Modal>
    )
}