import React, { useEffect } from 'react'
import Greeting from '@shared/components/Greeting'
import Grid from './components/Grid'
import Overview from './components/Overview'

const Dashboard = () => {
  return (
    <div className='bg-background text-foreground rounded-2xl pb-6 min-h-full'>
      <Greeting />
      <div className='space-y-6'>
        <Grid />
        <Overview />
      </div>
    </div>
  )
}


export default Dashboard
