import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos';

const useFetchTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

const useAddTodo = async (todo) => {
    try {
        const response = await axios.post(`${API_URL}/add`, todo);
        return response.data;
    } catch (error) {
        console.error('Error adding todo:', error);
        throw error;
    }
};

const useUpdateTodo = async (id, updatedTodo) => {
    try {
        const response = await axios.put(`${API_URL}update/${id}`, updatedTodo);
        return response.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

export { useFetchTodos, useAddTodo, useUpdateTodo };