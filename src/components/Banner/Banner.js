import React, { Component }  from 'react'
import './Banner.css'
import BannerImage from "../../static/Adidas-Bags-Banner.jpg";

class Banner extends Component{


	render() {
		return (

<div className="container">
		<br />
		<img src={BannerImage} alt="BannerImage" className="BannerImg" />
	
</div>

			);
	}
}

export default Banner;

