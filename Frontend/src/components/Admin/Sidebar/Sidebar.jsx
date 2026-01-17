import React from 'react'
import AccountName from './AccountName'
import SearchBar from './SearchBar'
import RouteSelect from './RouteSelect'
import Contribute from './Contribute'
import CommandMenu from './CommandMenu'

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
