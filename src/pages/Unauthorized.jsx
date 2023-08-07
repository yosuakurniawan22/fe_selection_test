import React from 'react'

export default function Unauthorized() {
  return (
    <section className='h-screen flex items-center justify-center'>
      <div className=''>
        <h1 className='text-5xl font-bold text-center'>Unauthorized Access</h1>

        <p className='text-center mt-2'>You do not have permission to access this page.</p>
      </div>
    </section>
  )
}
