import React, { Component } from 'react';



export default class SideBar extends Component{
		
	render(){
		const { user, logout} = this.props
		return (
			<div id="side-bar">
					<div className="heading">
						<div className="app-name">Наш великолепный чат</div>
						<div className="menu">
							
						</div>
					</div>
					
					
					<div className="current-user">
						<span>{user.name}</span>
						<div onClick={()=>{logout()}} title="Logout" className="logout">
							
						</div>
					</div>
			</div>
		);
	
	}
}
