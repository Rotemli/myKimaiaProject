import React from 'react'
import VideoItem from './VideoItem' 

const VideoList = ({videos , onUserSelect}) => {
    const list = videos.map((video) => {
    console.log("video ID => " + video.id.videoId)
        return(
            <VideoItem key={video.id.videoId} 
                       video={video} 
                       onUserSelect={onUserSelect}>
            </VideoItem>
        )
    })
    return <ul> {list} </ul>
}

export default VideoList