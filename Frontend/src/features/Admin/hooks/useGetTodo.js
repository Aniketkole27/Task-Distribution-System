import { useEffect, useState } from "react";
import { fetchTodos } from "../api/todos/todoApi";

const useGetTodo = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTodos = async () => {
        try {
            const response = await fetchTodos();
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return { todos, loading, refetch: getTodos };
}

export { useGetTodo }