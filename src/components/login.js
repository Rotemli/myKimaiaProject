import React from 'react'
import axios from 'axios'
import { Tab, Tabs } from 'react-bootstrap';

const SERVER_URL = "http://localhost:5000/users/"

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {        
            username: '',
            password: '',
            isAdmin: false
        }
    }
   
    render(){
        return(
            <div style={divStyle}>
                <Tabs defaultActiveKey="login" 
                      id="uncontrolled-tab-example">
                    <Tab eventKey="login" 
                         title="Log In">
                        <h1>Log In</h1>
                        <input style={inputStyle} 
                                onChange={this.onChangeUsername} 
                                placeholder="Username">
                        </input>
                        <br/>
                        <input style={inputStyle} 
                                type="password" 
                                onChange={this.onChangePassword}  
                                placeholder="Password">
                        </input>
                        <br/>
                        <button style={inputStyle} 
                                className="btn btn-primary" 
                                onClick={() => {this.handleLoginSubmit()}}>
                                Submit
                        </button>
                    </Tab>
                    <Tab eventKey="Signin" 
                         title="Sign In">
                        <h1>Sign In</h1>
                        <input style={inputStyle} 
                                onChange={this.onChangeUsername} 
                                placeholder="Username">
                        </input>
                        <br/>
                        <input style={inputStyle} 
                                type="password" 
                                onChange={this.onChangePassword} 
                                placeholder="Password">
                        </input>
                        <br/>
                        <button style={inputStyle} 
                                className="btn btn-primary" 
                                onClick={() => {this.handleRegisterSubmit()}}>
                                Submit
                        </button>
                    </Tab>         
                </Tabs>

            </div>
        )
    }

    async handleLoginSubmit(){
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            const user = {
                username: this.state.username,
                password: this.state.password  
            }
            const res = await axios.post(SERVER_URL + 'login', user)
            if(res.data.isUser){
                this.afterSubmit(res.data)
            }else{
                alert("wrong username or password")
            }
        }
    }

    async handleRegisterSubmit () {
        if(this.state.username.length > 0 && this.state.password.length > 0){
            const user = {
                username: this.state.username,
                password: this.state.password,
                isAdmin: this.state.isAdmin
            }
            const res = await axios.post(SERVER_URL + 'register', user)
            if (res.data.isUsernameFree) {
                this.afterSubmit(res.data)
             } else {
                alert("this username already exists")
             }
        }
    }

    afterSubmit = (data) => {
        this.props.loginHandle(data)
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword= (event) => {
        this.setState({
            password: event.target.value
        })
    }
}

export default Login

const divStyle = {border:'solid 1px #CDCDCD', 
                 padding:'10em auto' }
const inputStyle = {padding:'2em auto', 
                    margin:"1em auto"}