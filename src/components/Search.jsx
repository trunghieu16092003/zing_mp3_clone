import React from 'react'
import icons from '../ultis/icons'

const {FiSearch} = icons

const Search = () => {
  return (
    <div className='w-full flex items-center'>
        <span className='h-10 px-4 flex items-center justify-center rounded-l-[20px] bg-[#DDE4E4] text-gray-500'>
            <FiSearch />
        </span>
        <input 
            className='outline-none bg-[#DDE4E4] px-4 py-2 rounded-r-[20px] h-10 w-full text-gray-500'
            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        />
    </div>
  )
}

export default Search