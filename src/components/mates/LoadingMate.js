import React from 'react'
import { LoadingImage } from '../elements/loading/LoadingImage'
import { LoadingText } from '../elements/loading/LoadingText'
import { LoadingTitle } from '../elements/loading/LoadingTitle'

export const LoadingMate = () => {
  return (
    <div className='grid grid-cols-1 gap-4'>
        <LoadingImage />
        <LoadingTitle />
        {[...Array(2)].map(i => <LoadingText />) }
    </div>
  )
}
