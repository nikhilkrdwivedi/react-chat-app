import React from 'react';
import { BrowserRouter, Route, Switch ,Redirect} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import NavBar from './components/NavBar/NavBar';
import {Users ,UsersPost} from './components/Users/Users';
import {Login} from './components/Login/login'
import Splash from './components/Splash/splash'
import ErrorPage from './components/404/404'
import Profile from './components/Profile/Profile'
import Posts from './components/Posts/posts'
import Logout from './components/Logout/logout'
import { Model } from './models/login.model';
let UserName=localStorage.getItem('UserName');
class App extends React.Component{

  render(){ return (
    <div className="App">


     	<BrowserRouter>

					<Switch>
						<Route exact path="/" exact strict render={ props => <Splash {...props} /> } />
						<Route exact path="/login" exact strict render={ () =>  <Login model={Model} /> } />
						<Route exact path="/Nav" excat strict render={ () =>  <NavBar /> } />
						<Route exact path="/Profile" excat strict render={ () =>  <Profile /> } />
						<Route exact path="/Users" excat strict render={ () =>  <Users /> } />
						<Route exact path="/Posts" excat strict render={ () =>  <Posts /> } />
						<Route exact path="/Users/:UserSid"  exact strict component={UsersPost}/>
						<Route exact path="/logout"  exact strict render={ () =>  <Logout /> }/>
        )} />
						<Route render={ props => <ErrorPage message="We could not find that page (404)." {...props} /> } />

					</Switch>

				</BrowserRouter>

    </div>

  )
}
}
export default App;
