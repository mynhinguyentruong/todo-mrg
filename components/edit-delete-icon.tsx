import DeleteIcon from "@/app/icons/delete-icon";
import EditIcon from "@/app/icons/edit-icon";
import Link from "next/link";

export type EditAndDeleteProps = {
    listId?: string | number;
    todoId?: string | number;
}

export default function EditAndDeleteIcon({ listId, todoId }: EditAndDeleteProps) {
    let href = `${listId}` + (todoId ? `/${todoId}` : '')

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