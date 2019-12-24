///
/// message-page.js
///

import React, { Component } from 'react'
import Img404 from "../../static/404.svg";
import './404.css'

export class ErrorPage extends Component {

	///
	render() {

		// const Message = this.props.message;

		return (
			<>
		<style>{'body { background-color: #302e2e; }'}</style>

			<div>
			<h1 class="Message-CSS">We're launching soon!<br />
Watch out this space for more.</h1>
		<img src={Img404} alt="404_Not_Found" class="Ad-Logo" />
			</div>
	</>
		);

	}

}
export default ErrorPage;
