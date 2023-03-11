import React from 'react'

import icons from '../ultis/icons'
import {Search}  from '.'

const {
    AiOutlineArrowLeft,
    AiOutlineArrowRight
} = icons


const Header = () => {
  return (
    <div className='flex justify-between w-full'>
        <div className='flex gap-6 w-full'>
            <div className='flex items-center gap-6 text-gray-400' >
               <span><AiOutlineArrowLeft size={24} /></span> 
               <span><AiOutlineArrowRight size={24} /></span>
            </div>
            <div className='w-1/2'>
                <Search />
            </div>
        </div>

        <div>Đăng nhập</div>
        
    </div>
  )
}

export default Header