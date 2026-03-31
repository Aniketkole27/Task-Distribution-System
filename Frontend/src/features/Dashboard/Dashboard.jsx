import React, { useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import Grid from './components/Grid'
import Overview from './components/Overview'
import { useUserProfile } from './hook/useUserProfile'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../app/currentUserSlice'

const Dashboard = () => {
  const { loading, userProfile, refetch } = useUserProfile()

  const dispatch = useDispatch();

  dispatch(updateProfile(userProfile))
  useEffect(() => {
  }, [])


  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <Grid />
      <Overview />
    </div>
  )
}

export default Dashboard
