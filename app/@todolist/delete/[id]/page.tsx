import Modal, { Frame } from "@/components/modal";

export default function Delete({params}: {params: { id: string }}) {
    // on click db.delete entry
    // revalidate and navigate back to home page
    return (
        <Modal>
           <div className="m-8 my-20 max-w-[400px] mx-auto sm:rounded-2xl bg-white p-10">
                <div className="mb-8">
                    <h1 className="mb-4 text-3xl font-extrabold dark:text-black">Delete task</h1>
                    <p className="text-gray-600">Are you sure you want to delete this task?</p>
                </div>
                <div className="space-y-4">
                    <button className="p-3 bg-red-500 rounded-full text-white w-full font-semibold hover:bg-red-700">Delete</button>
                    <button className="p-3 bg-white border rounded-full w-full font-semibold hover:bg-slate-100 dark:text-black">Cancel</button>
                </div>
            </div>
        </Modal>
    )
}