import { useEffect, useState } from 'react'
import { fetchProjectTasks } from '../api/fetchProjectTasks'
import { useSelector } from 'react-redux'

const useProjectTask = (id) => {

  const [taskProject, setTaskProject] = useState([])
  const [loading, setLoading] = useState(false)

  const allProjects = useSelector(state => state.projectData.data);

  const getProjectTasks = async (id) => {
    setLoading(true)
    try {
      const response = await fetchProjectTasks(id);
      const project = await allProjects.find(project => project._id === id);
      // console.log("response = ", response.data)

      if (project) {
        setTaskProject({ "project": [{ ...project }], "tasks": response.data.data || [] });
      }
      // setTasks(response.data.tasks || [])

    } catch (error) {
      console.log("Error fetching tasks = ", error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProjectTasks(id)
  }, [id])

  return { loading, taskProject, refetch: getProjectTasks }
}

export { useProjectTask }