import React, { useState } from 'react'
import Greeting from '@shared/components/Greeting'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

const Todos = () => {
    const [searchResult, setSearchResult] = useState("")
    return (
        <div>
            <Greeting />
            <AddTask searchResult={searchResult} setSearchResult={setSearchResult} />
            <TaskList />
        </div>
    )
}

export default Todos
