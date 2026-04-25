import React from 'react'
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

const TodoList = () => {
    const allTask = useSelector(state => state.todos.allTask);
    console.log(allTask)

    return (
        <div className='pb-10'>
            <div className='space-y-3 mt-4 mx-4 max-w-2xl md:mx-auto'>
                {(!Array.isArray(allTask) || allTask.length === 0) ? (
                    <div className='flex flex-col items-center justify-center py-20 bg-background/50 rounded-2xl border border-dashed border-border'>
                        <div className='w-12 h-12 bg-card rounded-xl shadow-sm border border-border flex items-center justify-center text-muted-foreground mb-4'>
                            <ClipboardList size={24} />
                        </div>
                        <h2 className='text-foreground font-bold'>No todos yet</h2>
                        <p className='text-muted-foreground text-sm mt-1'>Get started by adding your first todo above.</p>
                    </div>
                ) : (
                    <>
                        {allTask.map((task) => (
                            task && (
                                <TodoItem key={task._id} task={task} />
                            )
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default TodoList





