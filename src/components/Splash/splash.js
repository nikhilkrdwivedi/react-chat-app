import React, { Component }  from 'react'
import './splash.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import adLogo from "../../static/adLogo.svg";
import Counter from "./counter";
import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee,faStar } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faCoffee,faStar)

class Splash extends Component {

///
constructor(props) {
	super(props);
	this.SplashPageTimer = null;
}

///
componentDidMount() {

	// Create a timer to switch away from the splash page after a short delay.
	this.SplashPageTimer = setTimeout(this.OnSplashPageTimeout, 4000);

}

///
componentWillUnmount() {
	this.SplashPageTimer = null;		// Remove the reference to the timer to GC can deallocate it.
}

///
OnSplashPageTimeout = () => {
	this.props.history.replace("/login");
}


///
render() {

	return (
		<div>
		<style>{'body { background-color: #302e2e; }'}</style>
		<div>
		<img src={adLogo} alt="Ad_Logo" class="Ad-Logo" />
		<button type="button" class="btn btn-outline-success btn-lg custum-btn">Join Now</button>
		</div>
		<div class="Counter-CSS"> <Counter val={3} /> </div>

		</div>

		);
	}
}
export default Splash;
