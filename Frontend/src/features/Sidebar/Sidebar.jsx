import React from 'react'
import AccountName from './components/AccountName'
import SearchBar from './components/SearchBar'
import RouteSelect from './components/RouteSelect'
import Contribute from './components/Contribute'

const Sidebar = () => {
  return (
    <div>
      <div id="sidebar" className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
        <AccountName />
        <SearchBar />
        <RouteSelect />
      </div>
      <Contribute />
    </div>
  )
}

export default Sidebar
