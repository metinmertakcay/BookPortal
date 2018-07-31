import React from 'react';
import * as ProjectAPI from './ProjectAPI';

class Button extends React.Component{
    render(){
        return(
            <button
                style = {{backgroundColor:'orange'}}
                type="button" 
                onClick = {() => {this.props.clickHandler()}}>{this.props.name}
            </button>
        )
    }
}

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {email:"", password:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.email == ""){
            this.setState({message:"Email is empty"})
        } else if(this.state.password == ""){
            this.setState({message:"Password is empty"})
        } else{
            var user = {email:this.state.email,password:this.state.password}
            ProjectAPI.getUserForAuth(user).then((result) =>{
                if(result == null){
                    this.setState({message:"Wrong email or password"})
                } else{
                    // YÖNLENDIRME YAPILMALI
                    this.setState({message:""})
                }
            });
        }
    }

    render(){
        return(
            <div aling="center">
                <table border="1">
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td><input type="email" name="email" value={this.state.email} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit"/></td>
                        </tr>
                    </tbody>
			    </table>
                <div>{this.state.message}</div>
            </div>
        )
    }
}

export default Login;