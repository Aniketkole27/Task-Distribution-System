import React from 'react'
import Greeting from './Greeting'
import Grid from './Grid'
import Overview from './Overview'

const Dashboard = () => {
  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
      <Greeting />
      <Grid />
      <Overview />
    </div>
  )
}

export default Dashboard
