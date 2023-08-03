import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Modal, { CreateNewTodoList } from "@/components/modal";
import { getOneUser, getOrCreateUser } from "@/lib/storage/UserRepository";
import { getServerSession } from "next-auth/next";

export default async function New() {
    const session = await getServerSession(authOptions)
    if (session?.user == null || session == null || !session.user.name || !session.user.email) {
        throw new Error("Unable to authenticated")
    }
    const user = await getOrCreateUser({ name: session.user.name, email: session.user.email})
    return (
        <Modal>
            <CreateNewTodoList user={user}/>
        </Modal>
    )
}