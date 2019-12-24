import React, { Component }  from 'react'
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import './Posts.css'
import chatIcon from "../../static/chatIcon.png";
import NavBar from '../NavBar/NavBar'
import Spinner from '../Spinner/Spinner'
let JWT_USER=localStorage.getItem('Jwt');
let UserSid=localStorage.getItem('UserSid');
export default class Posts extends Component{
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
       if(JWT_USER){
         let url="http://s28.ca/rest/bowspace/posts";
         const ApiRequest={
           "Jwt":JWT_USER
         }
         let response= await fetch(url, { method:'POST', body:JSON.stringify(ApiRequest) });
         let data=await response.json();
         let MatchingPosts=data.MatchingPosts;
         this.setState({MatchingPosts,loading:false,})
      }else{
        this.setState({loading:false,})
      }

     }

  datadisplay = ()=>{

       if(JWT_USER){
         let UsersList=[]
          let len=this.state.MatchingPosts.length
       for(let i=0;i<len;i++){
         var TimeStamp = this.state.MatchingPosts[i].PostedOnUtc.split("T");
         if(this.state.MatchingPosts[i].SenderSid ===UserSid){
           UsersList.push(
             <li class="me">
               <div class="entete">
                 <h3>{TimeStamp[0]},{TimeStamp[1]}</h3>
                 <h2>{this.state.MatchingPosts[i].Sender}</h2>
                 <span class="status blue"></span>
               </div>
               <div class="triangle"></div>
               <div class="message">
                 {this.state.MatchingPosts[i].PostHtml}
               </div>
             </li>
            )
               }
               else{
                 UsersList.push(
                   <li class="you">
                     <div class="entete">
                       <span class="status green"></span>
                       <h3>{TimeStamp[0]},{TimeStamp[1]}</h3>
                       <h2>{this.state.MatchingPosts[i].Sender}</h2>
                     </div>
                     <div class="triangle"></div>
                     <div class="message">
                     {this.state.MatchingPosts[i].PostHtml}

                     </div>
                   </li>
                   )



               }
     }
     return UsersList

       }
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
    <main>
    <ul id="chat">
        {this.datadisplay()}
      </ul>

    </main>
</div>

</div>
    )
	}
}
