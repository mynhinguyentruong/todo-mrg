import { Todo } from "@/app/types/db";
import Modal, { EditListOrTask } from "@/components/modal";
import { getOneTodo } from "@/lib/storage/TodoRepository";

export default async function Edit({params}: {params: { id: string }}) {
    const list = (await getOneTodo(parseInt(params.id))) as Todo

    return (
        <Modal>
          <EditListOrTask list={list} todo={null} /> 
        </Modal>
    )
}