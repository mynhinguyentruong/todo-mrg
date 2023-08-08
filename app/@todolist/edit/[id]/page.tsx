import { Todo, TodoList } from "@/app/types/db";
import Modal, { EditListOrTask } from "@/components/modal";
import { findOneTodoList } from "@/lib/storage/TodoListRepository";

export default async function Edit({params}: {params: { id: string }}) {
    const list = (await findOneTodoList(parseInt(params.id))) as TodoList

    return (
        <Modal>
          <EditListOrTask list={list} todo={null} /> 
        </Modal>
    )
}