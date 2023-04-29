import React from 'react'
import { DotLoader } from 'react-spinners';

const LoadingScreen = () => {
  return (
    <div className="w-full flex text-center justify-center">
        <DotLoader
        color='#00f6ff'
        loading
        speedMultiplier={3}
        size={200}
        />
    </div>
  )
}

export default LoadingScreen