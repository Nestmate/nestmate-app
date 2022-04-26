import React from 'react'

export const Container = ({children,className,size = ''}) => {
  return (
    <div className={`container ${className} ${size === 'sm' && 'max-w-lg'} ${size === 'md' && 'max-w-xl'}`}>{children}</div>
  )
}
