import React from 'react';
import SearchBar from './SearchBar'
import VideoList from './VideoList';
import SelectedVideo from './SelectedVideo';
import axios from 'axios'
import { Container, Row, Col } from "react-bootstrap"

// const YOUTUBE_API_KEY = "AIzaSyCX1emFGpptlKhhVKHz_kupQR3t8CG6mMs";
const YOUTUBE_API_KEY = "AIzaSyDUSfgaPKkb_s_oqXHjU0r5xBSdfTdPHQE";


class MainPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      videos : [],
      selectedVideo : null
    }
  }
  
  render(){
    return(
      <div>
        <Container>
            <Row>
              <Col xs="12">
                <SearchBar style={searchBarStyle} 
                           handleSubmit={userInput => this.videoSearch(userInput)}/>
              </Col>
            </Row>
            <Row>
              <Col xs="4">
                <VideoList style={videoListStyle}
                           videos={this.state.videos} 
                           onUserSelect={this.videoDisplay}/>
              </Col>
              <Col xs="8">
                <SelectedVideo style={selectedVideoStyle} 
                               video={this.state.selectedVideo}/>
              </Col>        
            </Row>         
          </Container>
      </div>
    )
  }


  getYoutubeSearch = (options, callback) => {
    // var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
    var params = {
      part: options.part,
      key: YOUTUBE_API_KEY,
      q: options.term,
      type: 'video'
      }
      this.youtubeRequest("search", params, callback)
  }

  getYoutubeVideoDetails = (options, callback) => {
    //https://www.googleapis.com/youtube/v3/videos?id=5hzgS9s-tE8&key=YOUR_API_KEY&part=snippet,contentDetails,statistics,status

    // var URL = 'https://www.googleapis.com/youtube/v3/videos';
    var params = {
      part: options.part,
      key: YOUTUBE_API_KEY,
      id:options.id
      }
    this.youtubeRequest("videos", params, callback)
    
  }

  youtubeRequest = (path, params, callback) => {
    axios.get('https://www.googleapis.com/youtube/v3/' + path, { params: params }, callback)
      .then(function(response) {
        if (callback) { callback(response.data.items) }
      })
      .catch(function(error) {
        console.error(error);
      });
  }


  videoSearch = (userInput) => {
    this.postToDatabase("keyword", {userInput:userInput})
    this.getYoutubeSearch({term:userInput, part: "snippet"}, (data) => {
      this.setState({
          videos: data,
          // selectedVideo: data[0]
      })
    })
  }

  postToDatabase = (path, params) => {
    axios.post(`http://localhost:5000/users/${this.props.userId}/` + path, params)
    .then((res => {
      console.log("return keywords => " + res.username + " " + res.keywords)
    }))
  }

  videoDisplay = (video) => {
    this.getYoutubeVideoDetails({id:video.id.videoId, part:"contentDetails"}, (data) => {     
      this.postToDatabase("watchedVideos", {videoName:video.snippet.title, duration: data[0].contentDetails.duration})
    })
    this.setState({
      selectedVideo : video
    })
  }
}

export default MainPage;






const searchBarStyle = {width: "50%", 
                        justifyContent: "center", 
                        marginButtom: "10em"}

const videoListStyle = {width: "20%", 
                        justifyContent: "left"}


 const selectedVideoStyle = {width: "60%", 
                            justifyContent: "right"}