import React, { useState } from 'react'
import Greeting from '@shared/components/Greeting'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import useGetTodos from './hook/useGetTodos'
import TodoForm from './components/TodoForm'

const Todos = () => {
    const [searchResult, setSearchResult] = useState("")
    const { isInitialLoading } = useGetTodos()
    const [openAddTask, setOpenAddTask] = useState(false)

    if (isInitialLoading) {
        // Skeleton Loader
        return <div className='flex items-center justify-center h-screen'>
            <div className='animate-spin rounded-full h-10 w-10 border-b-3 border-zinc-500'></div>
        </div>
    }
    return (
        <div className='bg-white text-stone-900 rounded-lg pb-3 shadow h-full'>
            <Greeting />
            <AddTodo
                openAddTask={openAddTask}
                setOpenAddTask={setOpenAddTask}
            />
            {
                openAddTask && (
                    <TodoForm
                        openAddTask={openAddTask}
                        setOpenAddTask={setOpenAddTask}
                    />
                )
            }
            <TodoList />
        </div>
    )
}

export default Todos
