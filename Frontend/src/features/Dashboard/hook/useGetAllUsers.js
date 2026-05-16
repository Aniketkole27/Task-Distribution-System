import { useEffect, useState } from "react"
import { fetchAllUsers } from "../api/fetchAllUsers"


const useGetAllUsers = (enabled = true) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllUsers = async () => {
        if (!enabled) return;
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
        if (enabled) {
            getAllUsers()
        }
    }, [enabled])

    return { loading, users, refetch: getAllUsers }
}

export { useGetAllUsers }