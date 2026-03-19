import { Search } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { handleAdd } from '@app/todoSlice'

const AddTask = ({ searchResult, setSearchResult }) => {
    const dispatch = useDispatch()

    const setTask = () => {
        searchResult.trim() ? dispatch(handleAdd({
            id: Math.floor(Math.random() * 1000),
            priority: "high",
            title: searchResult,
            isCompleted: false,
            dueDate: "10/3/2026"
        })) : ""
        setSearchResult("")
    }

    return (
        <div className='flex gap-3 items-center justify-center'>
            <div className='flex items-center border border-stone-400 px-3 w-130 rounded gap-2'>
                <Search size="16" />
                <input
                    value={searchResult}
                    onChange={(e) => setSearchResult(e.target.value)}
                    type="text"
                    className='outline-none py-1.5 w-115 px-1.5 placeholder:font-medium font-medium'
                    placeholder='Search Project'
                />
            </div>
            <button
                onClick={() => setTask()}
                className='cursor-pointer text-shadow-xs border border-stone-300  px-4 py-2 rounded font-medium text-black shadow hover:border-blue-300 hover:bg-blue-100  h hover:text-blue-500 active:bg-blue-200 transition-colors duration-300'>
                Add Task
            </button>
        </div>
    )
}

export default AddTask
