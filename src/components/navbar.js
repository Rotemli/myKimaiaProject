import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
      isAdmin: this.props.isAdmin
    }
  }
 
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

          {this.props.isAdmin === "true" &&
              <li className="navbar-item">
                <Link to="/stats" className="nav-link">Admin</Link>
            </li>
            }

            {this.props.isLoggedIn && 
              <li className="navbar-item">
              <Link to="/" className="nav-link" onClick={this.props.logoutHandler}>Log Out</Link>
            </li>
            }

          </ul>
        </div>
      </nav>
    )
  }
}