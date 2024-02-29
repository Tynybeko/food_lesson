import React, { useState } from 'react'

export default function ImageBlock({ src }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    if (error) {
        return (
            <img className='w-full' src="/errorImage.gif" alt="" />
        )
    }
    return (
        <>
            <img className={`${loading ? 'hidden' : 'w-full'}`} onError={() => setError(true)} onLoad={() => setLoading(false)} src={src} alt="" />
            {
                loading ? <img className='w-full' src="/loading.gif" alt="Loading" /> : null
            }
        </>
    )
}
