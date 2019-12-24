
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { observer } from 'mobx-react';
import './login.css'
import userIcon from "../../static/user.png";
export const Login = observer(
	class BasePage extends Component {

		renderRedirect = () => {
		  if(localStorage.getItem('Jwt')){
		    return <Redirect to='/Users' />
		  }
		  }
		OnLogin = (e) => {
	this.props.model.LoginAccount();

		}

		///
		OnChangeEmailAddress = (e) => {

			// Extract value from the event object.
			const NewValue = e.target.value;

			// Update the model *directly* using a model method.
			this.props.model.SetEmailAddress(NewValue);

		}

		///
		OnChangePassword = (e) => {

			// Extract value from the event object.
			const NewValue = e.target.value;

			// Update the model *directly* using a model method.
			this.props.model.SetPassword(NewValue);

		}

		///
		render() {

			// Sample the current state.
			const EmailAddress = this.props.model.EmailAddress;
			const Password = this.props.model.Password;

			// Render JSX to visualize sampled state.
			return (

        		<div className="container">
						<div>
							{this.renderRedirect()}
						 </div>
        			<div className="row">
        			<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 offset-xl-3 offset-lg-3 form-block">
        				<img src={userIcon} alt='UserIcon' className="User-Icon" />
        				<main>
        				<div className="form-group">
        				<label>Email : </label>
        				<input type="email" className="form-control"  name="EmailAddress" onChange={this.OnChangeEmailAddress} placeholder="Enter Email..."/>
        				</div>
        				<div className="form-group">
        				<label>Password :</label>
        				<input type="password" className="form-control" name="Password" onChange={this.OnChangePassword} placeholder="Enter Password..." />
        				</div>
        				<button type="button" className="btn btn-primary btn-md btn-block"  onClick={this.OnLogin}><b>login</b></button>
        				</main>
        			</div>
        			</div>
        		</div>


			);

		}

	}

);
