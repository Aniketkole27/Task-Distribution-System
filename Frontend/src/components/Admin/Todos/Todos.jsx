import React, { useState } from 'react'
import Greeting from '../Dashboard/Greeting'
import AddTask from './AddTask'
import TaskList from './TaskList'

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
