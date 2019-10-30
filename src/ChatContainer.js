import React, { Component } from 'react';
import SideBar from './SideBar'
import MessageInput from './messages/MessageInput'
import Messages from '../messages/Messages'


export default class ChatContainer extends Component {
	constructor(props) {
		super(props)
	}
	


	sendMessage = (message)=>{
		const { socket } = this.props
		socket.emit('new message', message )
	}

	/*
	*	Sends typing status to server.
	*	chatId {number} the id of the chat being typed in.
	*	typing {boolean} If the user is typing still or not.
	*/
	render() {
		const { user, logout } = this.props
		return (
			<div className="container">
				<SideBar
					logout={logout}
					user={user}
					/>
				<div className="chat-room-container">
							<div className="chat-room">
							<Messages 
									messages={messages}
									user={user}
									/>
								<MessageInput 
									sendMessage={
										(message)=>{
											this.sendMessage(message)
										}
									}
									
									/>

							</div>
				</div>

			</div>
		);
	}
}
