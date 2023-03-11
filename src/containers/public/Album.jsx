import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import * as apis from '../../apis'
import moment from 'moment';

import ListSong from '../../components/ListSong';

function Album() {
  const { pid } = useParams()


  const [playlistData, setPlaylistData] = useState({})

  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetailPlaylist(pid)
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data)
      }
    }

    fetchDetailPlaylist()
  }, [pid])

  return (
    <div className='flex gap-8 w-full px-[59px]'>
      <div className='flex-none w-1/4 borde flex flex-col items-center gap-2'>
        <img src={playlistData?.thumbnailM} alt="thumbnail" className='w-full object-contain rouded-md shadow-md' />
        <h3 className='text-[20px] font-bold text-gray-800'>{playlistData?.title}</h3>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>
          <span>Cập nhật:</span>
          <span>
            {moment.unix(playlistData?.contentLastUpdate).format("DD/MM/YYYY")}
          </span>
        </span>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>{playlistData?.artistsNames}</span>
        <span className='flex items-center gap-2 text-gray-500 text-xs'>{`${Math.round(playlistData?.like / 1000)}K người yêu thích`}</span>

      </div>
      <div className='flex-auto'>
        <div>
          <span className='text-gray-600 text-[14px]'>Lời tựa  </span>
          <span>{playlistData?.sortDescription}</span>
        </div>
        <ListSong songs={playlistData?.song?.items} totalDuration={playlistData?.song?.totalDuration} />
      </div>
    </div>
  )
}

export default Album