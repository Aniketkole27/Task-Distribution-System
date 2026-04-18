import API from '../../../api/axiosInstance'

export const fetchTodos = () =>{
    return API.get("/api/todos/")
}