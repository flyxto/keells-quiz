import React from 'react'

export default function WrongAnswer() {
  return (
    <div className='bg-red-500 h-screen w-screen flex flex-col gap-4 justify-center items-center text-white'>
        <p className='font-bold text-9xl uppercase shake'>Wrong Answer</p>
    </div>
  )
}
