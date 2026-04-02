import React, { useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import Grid from './components/Grid'
import Overview from './components/Overview'
import { useProjects } from './hook/useProjects'
import { useDispatch } from 'react-redux'
import { setData } from '../../app/projectDataSlice'


const Dashboard = () => {
  const dispatch = useDispatch();
  const { loading, allProjects, refetch } = useProjects()
  // console.log(allProjects)

  useEffect(() => {
    if (allProjects.length > 0) {
      dispatch(setData(allProjects))
    }
  }, [allProjects, dispatch])

  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <Grid />
      <Overview />
    </div>
  )
}

export default Dashboard
