import { Filter } from 'lucide-react'
import React, { useState } from 'react'

const FilterButton = () => {
  const [selected, setSelected] = useState("all")
  /* TODO :- Write Filter Logic */

  return (
    <div className="flex gap-3 items-center">
      <h2><Filter size="16" /></h2>
      <div className='border border-stone-300 rounded shadow p-1'>
        <select onChange={(e) => setSelected(e.target.value)} className='outline-none cursor-pointer'>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  )
}

export default FilterButton
