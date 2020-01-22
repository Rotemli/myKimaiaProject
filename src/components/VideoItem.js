import React from 'react'
import { Container, Row, Col } from "react-bootstrap"

const VideoItem = ({video , onUserSelect}) => {
    return(
        <div style={primaryDiv} 
             onClick={() => onUserSelect(video)}>
            <Container style={{paddingLeft: "0"}}>
                <Row>
                    <Col xs="6">
                        <img style={imgStyle} 
                             alt="" 
                             src={video.snippet.thumbnails.default.url}>
                        </img>
                    </Col>
                    <Col xs="6"> 
                        <div style={videoTitleStyle}>
                            {video.snippet.title.length > 50 ? 
                            video.snippet.title.substr(0, 50) + "..." : 
                            video.snippet.title}
                        </div>
                    </Col>                   
                </Row>
            </Container>
        </div>
    )
}

  
export default VideoItem

const primaryDiv = {border:"solid 1px black", 
                    marginBottom:"2em", 
                    dispaly:"flex",  
                    flexDirection: "row", 
                    maxHeight: "90px", 
                    maxWidth:"100%"}
                    
const imgStyle = {dispaly:"absolute", 
                justifyContent: "left", 
                height:"100%", 
                width:"100%", 
                padding:"0", 
                margin:"0"}

const videoTitleStyle = {dispaly:"flex", 
                        justifyContent: "right", 
                        overflow: "hidden", 
                        textSize: "5px", 
                        lineHeight:"1", 
                        paddingTop:"0.7em"}