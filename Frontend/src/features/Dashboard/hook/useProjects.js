import React, { useEffect, useState } from "react";
import { fetchAllProjects } from "../api/fetchAllProjects";

const useProjects = (enabled = true) => {
    const [allProjects, setAllProjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllProjects = async () => {
        if (!enabled) return;
        setLoading(true)
        try {
            const response = await fetchAllProjects();
            setAllProjects(response.data.projects || [])
            // console.log("All projects = ", response.data.projects)
        } catch (error) {
            console.log("Error fetching projects = ", error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (enabled) {
            getAllProjects()
        }
    }, [enabled])

    return { loading, allProjects, refetch: getAllProjects }
}

export { useProjects }