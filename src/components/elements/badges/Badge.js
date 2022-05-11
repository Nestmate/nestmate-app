import { Text } from '@mantine/core'
import React from 'react'

export const Badge = ({ icon, children }) => {
  return (
    <div className='p-1 bg-white rounded-3xl flex flex-cols justify-center gap-2 items-center border-2 border-slate-200' style={{minWidth: '40px'}}>
        { icon && <span className='text-xl'>{ icon }</span> }
        { children && <Text>{ children }</Text> }
    </div>
  )
}
