import React from 'react';

const SelectedVideo = function(props){
    const video = props.video

    if(!video){
        return <div> </div>;
    }

    const videoID = video.id.videoId
    const url = 'https://www.youtube.com/embed/' + videoID

    return(
        <div >
            <div style={{display:"flex",  justifyContent: "space-around" }}>
                <iframe style={{display:"flex",  justifyContent: "right"}}
                        width="560" 
                        height="315" src={url} 
                        title="video-player">
                </iframe>
            </div>
            <div className="details" style={{display:"flex"}}>
                <div>Currnetly Playing : {video.snippet.title}</div>
            </div>
        </div>
    )
    
}

export default SelectedVideo