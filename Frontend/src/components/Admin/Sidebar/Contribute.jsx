import React from 'react'

const Contribute = () => {
  return (
    <div className='flex sticky top-[calc(100vh-48px-16px)] flex-col h-12 border-t px-2 border-stone-300 justify-end text-sm'>
        <div className='flex items-center justify-between'>
            <div >
                <p className='font-bold'>GitHub</p>
                <p className='text-stone-500'>Source code</p>
            </div>

            <button className='px-2 py-1.5 font-medium bg-stone-200 hover:bg-stone-300 transition-colors rounded cursor-pointer'>
                Contribute
            </button>
        </div>
    </div>
  )
}

export default Contribute
