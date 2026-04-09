import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useProjectTask } from './useProjectTask'

export const useProjectsWithTask = (id, tasks) => {
    const [projectWithTasks, setProjectWithTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const allProjects = useSelector(state => state.projectData.data);
    // const { tasks } = useProjectTask(projectId)
    // console.log("Tasks in useProjectsWithTask = ", tasks)

    const getProjectWithTasks = () => {
        setLoading(true)
        const project = allProjects.find(project => project._id === id);
        if (project) {
            setProjectWithTasks({ "project": [{ ...project }], "tasks": [...tasks] });
        }
        setLoading(false);
    }

    useEffect(() => {
        getProjectWithTasks()
    }, [allProjects, tasks, id]);



    return { loading, projectWithTasks, refetch: getProjectWithTasks };
}
