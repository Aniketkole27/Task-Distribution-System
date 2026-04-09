import { useEffect, useState } from "react"
import { fetchAllUsers } from "../api/fetchAllUsers"


const useGetAllUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllUsers = async () => {
        setLoading(true)
        try {
            const response = await fetchAllUsers()
            setUsers(response.data.data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    return { loading, users, refetch: getAllUsers }
}

export { useGetAllUsers }