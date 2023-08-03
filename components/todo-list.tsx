import Link from "next/link";
import type { TodoList } from "@/app/types/db";
import CheckIcon from "@/components/icons/check-icon";

export default function TodoList({ list }: { list: TodoList }) {
    return (

    <Link
        href={`${list.id}`}
        className="flex aspect-square min-h-[64px] max-w-[64px] overflow-hidden flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
    >
    <CheckIcon/>
 
        <small className="text-xs font-medium truncate max-w-[42px]"> {list.title}</small>
    </Link>
    )
}