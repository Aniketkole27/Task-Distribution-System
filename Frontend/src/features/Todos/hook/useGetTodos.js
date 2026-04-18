import { useEffect, useState } from "react"
import { fetchTodos } from "../api/fetchTodos"
import { useSelector, useDispatch } from "react-redux"
// import { setTask } from "../../../app/todoSlice"

const useGetTodos = () => {
    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(false)
    const [isInitialLoading, setIsInitialLoading] = useState(true)
    // const callTodos = useSelector(state => state.todos.callTodos);
    // const dispatch = useDispatch()

    const getTodos = async () => {
        setLoading(true)
        try {
            const response = await fetchTodos()
            const fetchedTodos = response.data?.todos || []
            setTodos(fetchedTodos)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            setIsInitialLoading(false)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    // useEffect(() => {
    //     if (todos.length > 0) {
    //         dispatch(setTask(todos))
    //     }
    // }, [todos])

    return { todos, loading, isInitialLoading }

}

export default useGetTodos
