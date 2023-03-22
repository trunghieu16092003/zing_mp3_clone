import React from 'react'
import { Outlet } from 'react-router-dom'

const Search = () => {
  return (
    <div>
      <div className='h-[50px] mb-7 flex items-center text-sm border-b pl-[60px] border-gray-400 pb-1 '>
        <span className='text-[24px] font-bold pr-6 border-r border-gray-400'>Kết quả Tìm Kiếm</span>
        <div className='flex items-center'>
          <span className='px-4 hover:text-[#76a9a9] cursor-pointer font-semibold'>TẤT CẢ</span>
          <span className='px-4 hover:text-[#76a9a9] cursor-pointer font-semibold'>BÀI HÁT</span>
          <span className='px-4 hover:text-[#76a9a9] cursor-pointer font-semibold'>PLAYLIST/ALBUM</span>
        </div>
        
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Search