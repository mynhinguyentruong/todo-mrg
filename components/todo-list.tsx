import { TodoList } from "@/db";
import Link from "next/link";

export default function TodoList({ list }: { list: TodoList }) {
    return (

    <Link
        href={`${list.id}`}
        className="flex aspect-square min-h-[64px] max-w-[64px] overflow-hidden flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
    >
        {/* <!-- HeroIcon - Chart Bar --> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 shrink">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
 
        <small className="text-xs font-medium truncate max-w-[42px]"> {list.title}</small>
    </Link>
    )
}