import React from 'react'
import { PacmanLoader } from "react-spinners";

const Loader = ({ isLoading }) => {

    return (
        <>
        <div className='flex justify-center items-center h-72 '>
            <PacmanLoader
                size={60} color='#293230'
                loading/>
        </div>
            <h2 className='flex justify-center text-4xl font-semibold '>טוען ...  </h2>
        </>
    )
}

export default Loader