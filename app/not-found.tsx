import ArrowLeftIcon from '@/components/icons/arrow-left-icon'
import ExclaimationIcon from '@/components/icons/exclaimation-icon'
import Link from 'next/link'
 
export default function NotFound() {

  return (
        <section className="bg-white dark:bg-gray-900 ">
            <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div className="flex flex-col items-center max-w-sm mx-auto text-center">
                    <p className="p-3 text-sm font-medium text-red-500 rounded-full bg-red-50 dark:bg-gray-800">
                        <ExclaimationIcon/>
                    </p>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">Authentication failed</h1>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">You need to log in to be able to access this page. </p>

                    <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
                        <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <ArrowLeftIcon />
                            <Link href={'/'} className="">Back to sign in</Link>
                        </button>
                    </div>
                </div>
            </div>
        </section>
  )
}