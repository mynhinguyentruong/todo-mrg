
type PopupProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  createTodosWithAI: (title: string) => Promise<void>;
}

export default function Popup({ title, setTitle, createTodosWithAI }: PopupProps) {

  return (
    <div className="m-8 my-20 max-w-[600px] mx-auto rounded-lg">
       <div className="px-6 py-6 lg:px-8 bg-slate-50">
          <h3 className="mb-4 text-xl font-medium text-gray-900  rounded-lg">Create new tasks with AI</h3>
            <div className="space-y-6" >
              <div>
                <input 
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white" placeholder="I want to learn/start/complete..." required/>
              </div>
                   
              <button
                onClick={() => createTodosWithAI(title)}
                className="w-full text-white bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-400 dark:hover:bg-red-600 dark:focus:ring-red-800"
                >Done
              </button>
                    
            </div>
          </div>
      </div>
      )
}
