import React, { useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import Grid from './components/Grid'
import Overview from './components/Overview'

const Dashboard = () => {
  return (
    <div className='flex flex-col gap-6 bg-background text-foreground rounded-2xl pb-6 px-4 pt-4 h-full overflow-auto'>
      <Greeting />
      <Grid />
      <Overview />
    </div>
  )
}


export default Dashboard
