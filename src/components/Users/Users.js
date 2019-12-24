import React, { Component }  from 'react'
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import WordLimit from '../Message/wordLimit'

import './Users.css'
import chatIcon from "../../static/chatIcon.png";
import NavBar from '../NavBar/NavBar'
import Spinner from '../Spinner/Spinner'
let JWT_USER=localStorage.getItem('Jwt');
export  class Users extends Component{
  state={
  loading:true,
  MatchingUsers:[],
}
renderRedirect = () => {
  if(!JWT_USER){
    return <Redirect to='/' />
  }
  }
async componentDidMount(){

  let url="http://s28.ca/rest/bowspace/users";
  const ApiRequest={
    "Jwt":JWT_USER
  }
  let response= await fetch(url, { method:'POST', body:JSON.stringify(ApiRequest) });
  let data=await response.json();
  let MatchingUsers=data.MatchingUsers;
  this.setState({MatchingUsers,loading:false,})

}

datadisplay = ()=>{
    let UsersList=[]
    let countUser=1
  if(JWT_USER){
let UserSid=localStorage.getItem('UserSid');
  let table_class;
  let button_class;
  for(let i=0;i<this.state.MatchingUsers.length;i++){
    if(this.state.MatchingUsers[i].UserSid!=UserSid)
{
  if(i%2==0){
  table_class="text-center table-danger";
  button_class="btn btn-outline-info btn-sm";
 }else{
  table_class="text-center table-success";
  button_class="btn btn-outline-danger btn-sm";
 }
 let UserSidUrl="/Users/"+this.state.MatchingUsers[i].UserSid;

  UsersList.push(


  <tr>
    <td className={table_class} key={countUser} >{countUser}</td>
    <td className={table_class} key={this.state.MatchingUsers[i].UserName}>{this.state.MatchingUsers[i].UserName}</td>
    <td className={table_class}><a role="button" className={button_class} href={UserSidUrl}>Post</a></td>
  </tr>

  )
  countUser=countUser+1
}
  }
}
  return UsersList
}

	render() {
if (this.state.loading) {
      return <div><Spinner /></div>
    }
    return (
		<div>
    <div>
      {this.renderRedirect()}
     </div>
    <NavBar />
    <div className="container">
    <hr />
    <h1 className="text-center">User List</h1>
     <table class="table">
  <thead class="thead-dark">
    <tr>
      <th className="text-center" scope="col">S.No.</th>
      <th className="text-center" scope="col">UserName</th>
      <th className="text-center" scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
      {this.datadisplay()}

  </tbody>
</table>
</div>
    </div>
    )
	}
}



export  class UsersPost extends Component{
  state={
    UserSid:'',
  }
  renderRedirect = () => {
    if(!JWT_USER){
      return <Redirect to='/' />
    }
    }
  async componentDidMount () {
      const { UserSid } = this.props.match.params
      this.setState({UserSid,loading:false,})
      let url="http://s28.ca/rest/bowspace/posts";
      const ApiRequest={
        "Jwt": JWT_USER,

      }
      let response= await fetch(url, { method:'POST', body:JSON.stringify(ApiRequest) });


      let data=await response.json();
      data=data.MatchingPosts;
    }

    render() {
      if (!this.state.UserSid) {
            return <div><Spinner /></div>
          }
    return (
<div>
<div>
  {this.renderRedirect()}
 </div>
<NavBar />
<WordLimit UserId={this.state.UserSid}/>

</div>
    )

  }
}
