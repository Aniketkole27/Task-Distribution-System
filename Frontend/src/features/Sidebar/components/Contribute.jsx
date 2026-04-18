import React from 'react'

const Contribute = () => {
  return (
    <div className='flex sticky top-[calc(100vh-48px-16px)] flex-col h-14 border-t px-2 border-border/50 bg-background justify-center text-sm'>
      <div className='flex items-center justify-between'>
        <div >
          <p className='font-bold text-foreground'>GitHub</p>
          <p className='text-xs text-muted-foreground'>Source code</p>
        </div>

        <button className='px-3 py-1.5 text-xs font-semibold bg-card hover:bg-card/80 shadow-sm border border-border transition-colors rounded-lg cursor-pointer text-foreground'>
          Contribute
        </button>
      </div>
    </div>
  )
}

export default Contribute
