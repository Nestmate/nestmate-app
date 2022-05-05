import { Button } from '@mantine/core'
import React from 'react'

export const SettingsCardHeader = ({ title, subtitle, cta, onSubmit}) => {
  return (
    <header className='flex flex-row justify-between'>
          <div className='flex flex-col gap-2 items-start'>
              {title && <h2 >{title}</h2>}
              {subtitle && <p className='text-slate-700 text-xl'>{subtitle}</p>}
          </div>
          {cta && <div><Button type='submit' onClick={onSubmit}>{cta}</Button></div>}
    </header>
  )
}
