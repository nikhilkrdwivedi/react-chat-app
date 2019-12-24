
import React, { Component }  from 'react'
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import './Profile.css'
import NavBar from '../NavBar/NavBar'
import Spinner from '../Spinner/Spinner'
import userIcon from "../../static/user.png";
let JWT_USER=localStorage.getItem('Jwt');
let UserSid=localStorage.getItem('UserSid');

export  class Profile extends Component{
  state={
    loading:true,
    UserSid:'',
    UserName:'',
    EmailAddress:'',
    IsAdmin:''

  }
  renderRedirect = () => {
    if(!JWT_USER){
      return <Redirect to='/' />
    }
    }
  async componentDidMount () {
      if(JWT_USER){
        let url="http://s28.ca/rest/bowspace/users?usersid="+UserSid;
        const ApiRequest={
          "Jwt": JWT_USER
        }
        let response= await fetch(url, {method:'POST', body:JSON.stringify(ApiRequest)});
        let data=await response.json();
        data=data.MatchingUsers[0];
        this.setState({status:false,})
        this.setState({UserSid:data.UserSid,})
        this.setState({UserName:data.UserName,})
        this.setState({EmailAddress:data.EmailAddress,})
        this.setState({IsAdmin:data.IsAdmin,})
      }else{
        this.setState({status:false,})
      }

    }

    render() {
      if (this.state.status) {
            return <div><NavBar /><Spinner /></div>
          }
    return (
<div>
<div>
  {this.renderRedirect()}
 </div>
    <NavBar />

    <div className="container Box">

<form>
  <div className="input-field">
    <img src={userIcon} alt='UserIcon' className="User-Icon" />
    <p className="tag-line">Your Personal Details</p>
    <div class="col-auto">
      <div class="input-group mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text">Name</div>
        </div>
        <input type="text" class="form-control" value={this.state.UserName}/>
      </div>
    </div>
    <div class="col-auto">
      <div class="input-group mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text">Email</div>
        </div>
        <input type="text" class="form-control" value={this.state.EmailAddress} />
      </div>
    </div>

  <div class="col-auto">
      <label class="sr-only" for="inlineFormInputGroup">Username</label>
      <div class="input-group mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text">UserName</div>
        </div>
        <input type="text" class="form-control" value={this.state.UserSid}/>
      </div>
    </div>
    <div class="col-auto">
      <label class="sr-only" for="inlineFormInputGroup">Username</label>
      <div class="input-group mb-4">
        <div class="input-group-prepend">
          <div class="input-group-text">isAdmin</div>
        </div>
        <input type="text" class="form-control" value={this.state.IsAdmin?"Yes":"No"} readonly/>
      </div>
    </div>

  </div>
</form>
</div>
</div>

    )

  }
}

export default Profile
