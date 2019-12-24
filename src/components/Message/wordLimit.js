import React, { Component }  from 'react'
import PropTypes from 'prop-types';
import './wordLimit.css'
let JWT_USER=localStorage.getItem('Jwt');
let UserSid=localStorage.getItem('UserSid');
class WordLimit extends React.Component {
  static propTypes = {
  UserId: PropTypes.string.isRequired,
}
  constructor(props) {
  super(props);
  this.state = {
           loading:true,
            UserSid:'',
            MatchingPosts:[],
            value: '',
            charsleft: 800,
            maxchar:800,
            status:false
          };
  this.handleSubmit = this.handleSubmit.bind(this);
}
handleWordCount = event => {
        const charCount = event.target.value.length;
        const maxChar = this.state.maxchar;
        const charLength = maxChar - charCount;
        this.setState({
          charsleft: charLength,
          value: event.target.value
        });
  }
  handleSubmit (event)  {
     event.preventDefault();
     let url="http://s28.ca/rest/bowspace/post";
     const ApiRequest={
       "Jwt": JWT_USER,
     "SenderSid": UserSid,
     "RecipientSid":this.props.UserId,
     "PostBody":this.state.value
       }
     fetch(url, { method:'POST', body:JSON.stringify(ApiRequest) })
     .then(
       res => {
         if(res.status === 200){
           window.location.reload();
         }
       }
     );

   }
async componentDidMount(){
     let url="http://s28.ca/rest/bowspace/posts";
     const ApiRequest={
       "Jwt":JWT_USER
     }
     let response= await fetch(url, { method:'POST', body:JSON.stringify(ApiRequest) });
     let data=await response.json();
     let MatchingPosts=data.MatchingPosts;
     this.setState({MatchingPosts,loading:false,})

   }

datadisplay = ()=>{

     if(JWT_USER){
       let UsersList=[]
        let len=this.state.MatchingPosts.length
     for(let i=0;i<len;i++){
       var TimeStamp = this.state.MatchingPosts[i].PostedOnUtc.split("T");


       if(this.state.MatchingPosts[i].SenderSid ===UserSid && this.state.MatchingPosts[i].RecipientSid===this.props.UserId){
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
             if(this.state.MatchingPosts[i].SenderSid === this.props.UserId && this.state.MatchingPosts[i].RecipientSid===UserSid ){

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

      return (

        <div className="container">
        <main>
        <ul id="chat">
      {this.datadisplay()}
          </ul>
          <form  onSubmit={this.handleSubmit}>
          <div class="form-group">
        <textarea class="form-control" type="text"
        maxLength="800"
        required
        onChange={this.handleWordCount} rows="3"></textarea>
        <p>{this.state.charsleft}</p>
        <button type="submit" value="submit" class="btn btn-primary">Submit</button>
        </div>
        </form>
        </main>
</div>


     )
  }
}

export default WordLimit
