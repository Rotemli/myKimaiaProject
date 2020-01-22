import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import Login from './components/login'
import MainPage from "./components/mainPage"
import AdminPage from "./components/adminPage"
import Navbar from "./components/navbar"


class App extends React.Component {

  constructor(props){
    super(props)
    this.loginHandle = this.loginHandle.bind(this)
    
  }
  state = {
    loggedIn : false,
    isAdmin : false,
    username: "",
    _id: ""
  }


  async loginHandle(data) {
    await this.setState(prevState => ({
      loggedIn : true,
      isUserAdmin : data.isAdmin,
      username: data.username,
      _id: data._id
    }))
  }

  logoutHandle = () =>{
    this.setState({
      loggedIn : false,
      isUserAdmin : false,
      username: ""
    })
  }

  render(){
    return (
      <Router>
        <div className="App container">
          <Navbar isAdmin={this.state.isUserAdmin} 
                  isLoggedIn={this.state.loggedIn} 
                  logoutHandler = {this.logoutHandle}/>
          <br />
          <Route path="/" exact render={() => {
            return (this.state.loggedIn ? 
                  <MainPage userId={this.state._id} handleLogOut={this.loginHandle}></MainPage> : 
                  <Login loginHandle={this.loginHandle}></Login>)
          }}></Route>

           <Route path="/stats" exact render={() => {
              return(this.state.isUserAdmin === "true" ? 
                  <AdminPage></AdminPage> : 
                  <Redirect to="/"></Redirect>)
           }}></Route>
          
        </div>
      </Router>
    )
  }

}

export default App;

