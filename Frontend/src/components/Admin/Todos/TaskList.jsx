import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { handleAdd } from '../app/todoSlice';
import TodoFormate from './TodoFormate';

const TaskList = () => {
    const dispatch = useDispatch();
    const allTask = useSelector(state => state.todos.allTask);

    const tasks = [
        {
            id: "1",
            priority: "high",
            title: "Complete Python course 1",
            dueDate: "10/3/2026",
            isCompleted: false
        },
        {
            id: "2",
            priority: "medium",
            title: "Complete Python course 2",
            dueDate: "10/3/2026",
            isCompleted: false
        },
        {
            id: "3",
            priority: "low",
            title: "Complete Python course 3",
            dueDate: "10/3/2026",
            isCompleted: true
        },
    ]

    const check = useRef(false)

    useEffect(() => {
        if (check.current) return;
        tasks.forEach((task) => {
            dispatch(handleAdd(task))
        })
        check.current = true
    }, [])

    return (
        <div>
            <div className='space-y-2 mt-7 mx-4'>
                {allTask.length == 0 ? <h1 className='text-center text-2xl font-semibold'>No Todos</h1> : ""}

                {allTask.map((task) => (
                    task.isCompleted !== true ? <TodoFormate task={task} /> : ""
                ))}

                {allTask.map((task) => (
                    task.isCompleted === true ? <TodoFormate task={task} /> : ""
                ))}
            </div>
        </div>
    )
}

export default TaskList



