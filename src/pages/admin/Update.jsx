import React from 'react'
import { useParams } from 'react-router-dom'

export default function Update() {
    const params = useParams()
    console.log(params.foodId);
  return (
    <div>Update</div>
  )
}
