import React, {useState} from 'react';
import { Redirect} from 'react-router-dom';
import { observable } from 'mobx';
export const Model = observable(

	{ EmailAddress:"", Password:"" }

);
Model.LoginAccount = async function() {
	try {
		const Endpoint = "http://s28.ca/rest/bowspace/login";
		const ApiRequest = JSON.stringify(
			{
				EmailAddress:this.EmailAddress,
				Password:this.Password
			}
		);
		let FetchData = {
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			credentials:'omit',
			headers: {
				'Content-Type': 'application/octet-stream',
				'Content-Length': ApiRequest.length,
			},
			body: ApiRequest
		};
		let FetchReply = await fetch(Endpoint, FetchData);
		let ApiReply = await FetchReply.json();
if (ApiReply.Status==='success') {
  localStorage.setItem('Jwt',ApiReply.Jwt)
  localStorage.setItem('EmailAddress',this.EmailAddress)
	const URL = "http://s28.ca/rest/bowspace/users";
	const Request = JSON.stringify(
	  {
	    "Jwt":ApiReply.Jwt,
	  }
	);
	let FetchUserData = {
	  method:'POST',
	  mode:'cors',
	  cache:'no-cache',
	  credentials:'omit',
	  headers: {
	    'Content-Type': 'application/octet-stream',
	    'Content-Length': Request.length,
	  },
	  body: Request
	};
	let Reply = await fetch(URL, FetchUserData);
	let ApiRes = await Reply.json();
	console.log("ApiRes",ApiRes.MatchingUsers);
	let Data=ApiRes.MatchingUsers;
	Data.forEach(data=>{
		if(data.EmailAddress===this.EmailAddress){
			localStorage.setItem('Jwt',ApiReply.Jwt)
		  localStorage.setItem('EmailAddress',this.EmailAddress)
		  localStorage.setItem('UserName',data.UserName)
		  localStorage.setItem('UserSid',data.UserSid)
		  localStorage.setItem('IsAdmin',data.IsAdmin)
			window.location.reload();
		}
	})

}
	} catch(e) {

		console.log("[Model] Exception! e -->"); console.log(e);

	}
}
Model.Reset = function() {

	this.EmailAddress = "";
	this.Password = "";

}

Model.SetEmailAddress = function(newvalue) {
	this.EmailAddress = newvalue;
}

Model.SetPassword = function(newvalue) {
	this.Password = newvalue;
}
