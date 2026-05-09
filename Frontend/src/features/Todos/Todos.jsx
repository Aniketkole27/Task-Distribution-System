import React, { useState, useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '@app/todoSlice'
import TodoForm from './components/TodoForm'

const Todos = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.todos)
    const [openAddTask, setOpenAddTask] = useState(false)

    useEffect(() => {
        dispatch(fetchTodos())
    }, [dispatch])

    if (loading && openAddTask === false) {
        return <div className='flex items-center justify-center h-screen'>
            <div className='animate-spin rounded-full h-10 w-10 border-b-3 border-zinc-500'></div>
        </div>
    }

    return (
        <div className='flex flex-col gap-6 bg-background text-foreground rounded-2xl pb-6 h-full'>
            <Greeting />
            <div className='bg-card text-foreground rounded-lg shadow flex-1 flex flex-col overflow-hidden'>
                <AddTodo
                    setOpenAddTask={setOpenAddTask}
                />
                {
                    openAddTask && (
                        <TodoForm
                            setOpenAddTask={setOpenAddTask}
                        />
                    )
                }
                <TodoList />
            </div>
        </div>
    )
}

export default Todos
