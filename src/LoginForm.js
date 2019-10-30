import React, {Component} from 'react';

export default class LoginForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            nickname:"",
            error:""
        };
    }

    setUser = ({user, isUser})=>{
       
        if(isUser){
            this.setError("Такое имя существует")
        }else{
            this.props.setUser(user)
            this.setError("")

        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();

        const {socket} = this.props
        const {nickname} = this.state
        socket.emit('VERIFY USER', nickname, this.setUser)
     
    }
    handleChange = (e)=> {
        this.setState({nickname:e.target.value})
    }

    setError = (error) => {
        this.setState({error})
    }

    render(){
        const {nickname, error} = this.state
        return(
            <div className="login">
                <form onSubmit={this.handleSubmit} className="login-form">
                <label htmlFor="nickname">
                    <h2>Введите имя пользователя</h2>
                </label>
                <input 
                ref={(input)=>{this.textInput = input}}
                type="text" 
                value = {nickname}
                onChange = {this.handleChange}
                placeHolder = {'Имя Пользователя'}
                id="nickname"/>
                <div className="error">{error? error:null}</div>
                </form>
            </div>
        )
    }
}