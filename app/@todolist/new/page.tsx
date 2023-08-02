import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Modal, { Frame } from "@/components/modal";
import { getOrCreateUser } from "@/db";
import { getServerSession } from "next-auth/next";

export default async function New() {
    const session = await getServerSession(authOptions)
    const user = await getOrCreateUser({ name: session?.user?.name, email: session?.user?.email})
    return (
        <Modal>
            <Frame user={user}/>
        </Modal>
    )
}