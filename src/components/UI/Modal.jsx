import React from 'react'

export default function Modal({ children, setClose }) {
    return (
        <div className='w-full h-screen left-0 top-0 absolute flex justify-center items-center' onClick={() => setClose()}>
            <div onClick={(e) => e.stopPropagation()} >
                {children}
            </div>
        </div>
    )
}
