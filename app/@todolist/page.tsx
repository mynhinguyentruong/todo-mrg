import Link from "next/link";

export default function Page(  ) {
    return (
        <div className="mx-auto max-w-md text-center flex flex-col justify-center items-center py-64 lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl">Boost your productivity.<br/>Start using task app today.</h2>
            <div className="mt-10 flex items-center justify-center gap-x-6 ">
                <Link data-testid="newlistbutton" href="/new" className="rounded-md bg-red-100 px-3.5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Create a new list</Link>
            </div>
      </div>
    )
}
