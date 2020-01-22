import React from 'react';
import axios from 'axios'
import { Container, Row, Col, Dropdown } from "react-bootstrap"

class AdminPage extends React.Component{

    constructor(props){
        super(props)
        this.state={
            usersList : [],
            userData: {
                username: "",
                keywordsList: [{}],
                watchedVideosList:[{}]
            }
        }
    }

    async componentDidMount() {
        const res = await axios.get('http://localhost:5000/users/list')
        const list = res.data.map((user) => {
            return {username : user.username, _id : user._id}
        })
        this.setState({usersList : list})
      }

    async getUserData(id){
        const res = await axios.get(`http://localhost:5000/users/${id}/usersdata`)
        const videoList = res.data.watchedVideos.map((video) => {
            return ({videoName: video.videoName, 
                    duration: video.duration})
        })
        const wordsList = res.data.keywords.map((word) => {
            return word.keyword
        })

        this.setState({userData: {username: res.data.username, 
                                  watchedVideosList:videoList, 
                                  keywordsList:wordsList}})
    }

    render(){
        const USER_DATA= this.state.userData
        return(
            <div style={primaryDivStyle}>
                <h1 style={h1Style}>Choose the user you want to get data of: </h1>
                <Dropdown style={dropdownStyle}>
                    <Dropdown.Toggle 
                            variant="success" 
                            id="dropdown-basic">
                        Users List
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {this.state.usersList.map((user) => {
                        return <Dropdown.Item 
                                    onClick={() => this.getUserData(user._id)} 
                                    href="">{user.username}
                                </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <br />
                {USER_DATA.username && 
                <Container>
                    <Row>
                        {USER_DATA.keywordsList.length > 0 && 
                        <Col xs="6"> 
                            <h3>Keywords Searched By {USER_DATA.username} :</h3>
                            {USER_DATA.keywordsList.map((word) => {
                                return <p>{word}</p>})}      
                        </Col>}

                        {USER_DATA.watchedVideosList.length > 0 && 
                        <Col xs="6">
                            <h3> Watched Videos By {USER_DATA.username} :</h3>
                            {USER_DATA.watchedVideosList && USER_DATA.watchedVideosList.map((video) => {
                            return <p>{video.videoName + " " + video.duration}</p>
                        })}            
                        </Col>}
                    </Row>
                 </Container>
                }
            </div>
        )
    }

    
}
export default AdminPage


const primaryDivStyle = {justifyContent: "left", 
                        textAlign:"left"}
const h1Style = {display:"flex", 
                justifyContent:"left"}
const dropdownStyle = {display:"flex", 
                      justifyContent:"right", 
                      textAlign:"right"}