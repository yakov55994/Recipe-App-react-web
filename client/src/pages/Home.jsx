import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Home = () => {
    const naigate = useNavigate();
  return (
    <div>
        <h1>
        Home
        </h1>
        <button onClick={() => {naigate('/Recipes')}}>Move to recipes</button>
        </div>

  )
}

export default Home