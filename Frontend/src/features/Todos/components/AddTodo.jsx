import { Plus, Search, Command } from 'lucide-react'
import React from 'react'

const AddTodo = ({ setOpenAddTask }) => {
    return (
        <div className='flex gap-3 items-center justify-center py-6 px-4'>
            <div
                className='flex items-center bg-muted/70 hover:bg-muted relative rounded-lg flex-1 max-w-2xl px-3 py-2 text-sm transition-colors cursor-pointer group'
                onClick={() => setOpenAddTask(true)}
            >
                <span className='mr-3 text-muted-foreground group-hover:text-foreground transition-colors'>
                    <Search size={16} />
                </span>
                <input
                    readOnly
                    type="text"
                    placeholder='Add a new todo...'
                    className='w-full bg-transparent placeholder:text-muted-foreground font-medium focus:outline-none cursor-pointer text-foreground'
                />

                {/* <span className='p-1 text-[10px] font-bold flex items-center gap-0.5 shadow-sm bg-background border border-border rounded text-muted-foreground ml-2'>
                    <Command size={10} />
                    K
                </span> */}
            </div>

            <button
                onClick={() => setOpenAddTask(true)}
                className='flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-sm font-bold px-5 py-2.5 rounded-lg shadow-sm active:scale-95 transition-all whitespace-nowrap'
            >
                <Plus size={16} />
                <span className='hidden sm:inline'>New Todo</span>
            </button>
        </div>
    )
}

export default AddTodo


