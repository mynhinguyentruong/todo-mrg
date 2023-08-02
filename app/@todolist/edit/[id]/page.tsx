import Modal, { EditListOrTask } from "@/components/modal";
import { getATodoList } from "@/db";

export default async function Edit({params}: {params: { id: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    const list = await getATodoList(params.id)

    // get title from here
    
    return (
        <Modal>
          <EditListOrTask list={list} todo={null} /> 
        </Modal>
    )
}