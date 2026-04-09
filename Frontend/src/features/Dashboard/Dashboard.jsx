import React, { useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import Grid from './components/Grid'
import Overview from './components/Overview'

const Dashboard = () => {



  return (
    <div className='bg-[#FFFFFF] text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <Grid />
      <Overview />
    </div>
  )
}

export default Dashboard
