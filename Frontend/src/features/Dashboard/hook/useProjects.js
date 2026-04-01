import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../api/fetchAllProjects";

const useProjects = () => {
    const [allProjects, setAllProjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllProjects = async () => {
        try {
            const response = await fetchAllProjects();
            setAllProjects(response.data.projects)
            console.log("All projects = ", response.data.projects)
        } catch (error) {
            console.log("Error fetching projects = ", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProjects()
    }, [])

    return { loading, allProjects, refetch: getAllProjects }
}

export { useProjects }