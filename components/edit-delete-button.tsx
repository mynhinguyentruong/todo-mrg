import DeleteIcon from "@/components/icons/delete-icon";
import EditIcon from "@/components/icons/edit-icon";
import Link from "next/link";

export type EditAndDeleteProps = {
    listId?: number;
    todoId?: number;
}

export default function EditAndDeleteButton({ listId, todoId }: EditAndDeleteProps) {
    const href = `${listId}` + (todoId ? `/${todoId}` : '')

    return (
        <div className="flex space-x-2 ml-10">
            <Link href={`/delete/${href}`}>
               <DeleteIcon /> 
            </Link>
            
            <Link href={`/edit/${href}`}>
                <EditIcon />
            </Link>
            
        </div>
    )
}
