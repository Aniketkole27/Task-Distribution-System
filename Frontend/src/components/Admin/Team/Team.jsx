import React from 'react'
import Greeting from '../Dashboard/Greeting'
import TopSection from './TopSection'
import TeamList from './TeamList'

function Team() {
  return (
    <div className='bg-white text-black rounded-lg pb-3 shadow h-full'>
       <Greeting />
       <TopSection />
       <TeamList />
    </div>
  )
}

export default Team
