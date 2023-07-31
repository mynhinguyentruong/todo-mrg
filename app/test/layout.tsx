export default function Layout({ children, slot }) {
    return (
        <div
            className="flex bg-white dark:bg-slate-900 w-screen h-screen pattern">
                <div>{children}</div>
                <div>{slot}</div>
        </div>
    )
}