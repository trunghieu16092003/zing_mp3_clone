import React from 'react'
import { Audio } from 'react-loader-spinner'
import { memo } from 'react'

function AudioLoading() {
    return (
        <Audio
            height="50"
            width="50"
            color="white"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    )
}

export default memo(AudioLoading)