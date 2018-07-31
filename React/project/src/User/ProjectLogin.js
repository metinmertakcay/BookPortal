import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

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
            var user = {email:this.state.email, password:this.state.password}
            ProjectAPI.getUserForAuth(user).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        // Admin
                        this.props.history.push("/admin")
                    } else if(result == 0){
                        // User
                        this.props.history.push("/user")
                    } else{
                        this.setState({message:"Wrong email or password"})
                    }
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h3>Login</h3>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>Email:</b></td>
                            <td><input type="email" name="email" value={this.state.email} onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td><b>Password:</b></td>
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