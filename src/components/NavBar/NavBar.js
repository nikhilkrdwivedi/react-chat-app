import React, { Component }  from 'react'
import './NavBar.css'
import Banner from '../Banner/Banner'
let UserName=localStorage.getItem('UserName');

class NavBar extends Component{

  render() {
    return (
      <div>
    <nav className="navbar  navbar-expand-lg navbar navbar-dark bg-dark">
  <div className="container">
   <a className="navbar-brand" href="/">
   <h3>ChatWithUs.io</h3>
  </a>
  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">
    <ul className="navbar-nav">
     <li className="nav-item active">
        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/Users">Users-List</a></li>
        <li className="nav-item active">
        <a className="nav-link" href="/Posts">Your-Post</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/Profile">Your-Profile</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/logout">Logout</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link">Hi! {UserName}</a>
      </li>
</ul>
</div>
</div>
</nav>
<Banner />
</div>
    )
  }
}

export default NavBar
