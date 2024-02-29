import React from 'react'

export default function Button({ children, ...attr }) {
    return (
        <button className='px-3 py-1 bg-blue-400 hover:bg-blue-700 rounded-lg text-white' {...attr}> {children} </button>
    )
}
