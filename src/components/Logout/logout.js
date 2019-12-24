
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';

let JWT_USER=localStorage.getItem('Jwt');

class Logout extends Component {
  renderRedirect = () => {
      if(!JWT_USER){
        return <Redirect to='/' />
      }
      }
async componentDidMount(){
  localStorage.removeItem('Jwt');
  localStorage.removeItem('EmailAddress');
  localStorage.removeItem('Jwt')
  localStorage.removeItem('UserName')
  localStorage.removeItem('UserSid')
  localStorage.removeItem('IsAdmin')
  	window.location.reload();
}

    render() {

      return (

        <div>
          {this.renderRedirect()}
         </div>

      )
    }
		}
  export default Logout
