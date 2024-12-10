import React from 'react'
import { useNavigate } from 'react-router-dom'
import Recipes from './Recipes';

const Home = () => {
    const naigate = useNavigate();
  return (
    <div>
        <Recipes/>
        </div>

  )
}

export default Home