export default function Loading() {
    return (
        <div role="status" className="animate-pulse py-64 ">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>

            <div className="h-2.5 mx-auto my-3 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="h-2.5 mx-auto my-3 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="h-2.5 mx-auto my-3 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="flex items-center justify-center mt-4">
                
                <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}