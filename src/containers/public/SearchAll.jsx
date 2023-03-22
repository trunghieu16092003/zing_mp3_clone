import React from 'react'
import { useSelector } from 'react-redux'

import { handleNumber } from '../../ultis/fn'
import { SongItems } from '../../components'
const SearchAll = () => {

    const { searchData } = useSelector(state => state.music)
    return (
        <div className='w-full flex flex-col px-[60px]'>
            <div className='flex flex-col'>
                <h3 className='text-lg font-bold mb-5'>Nổi Bật</h3>
                <div className='flex gap-8'>
                    {searchData?.top && <div className='p-[10px] flex-1 bg-[#d8e1e1] flex gap-8 items-center rounded-md'>
                        <img src={searchData?.top.thumbnail} alt="avatar" className={`w-[84px] h-[84px] object-cover ${searchData.top.objectType === 'artist' && 'rounded-full' }`} />
                        <div className='flex flex-col text-xs'>
                            <span className='mb-[6px]'>{searchData.top.objectType === 'artist' ? 'Nghệ sĩ' : '' }</span>
                            <span className='text-sm font-semibold'>{searchData.top.title || searchData.top.name}</span>
                            {searchData.top.objectType === 'artist' && <span>{handleNumber(searchData.artists[0]?.totalFollow) + ' quan tâm'}</span>}
                        </div>
                    </div>}

                    {searchData?.songs.map((item, index) => [...Array(2).keys()].some(item => item === index))}
                    <div className="flex-1">song 1</div>
                    <div className="flex-1">song 2</div>
                </div>
            </div>
        </div>
    )
}

export default SearchAll