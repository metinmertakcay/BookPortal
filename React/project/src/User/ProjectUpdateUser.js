import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class UpdateUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {olduserid:"", email:"", name:"", password:"", rid:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.olduserid == ""){
            this.setState({message:"Old user id field is empty"})
        } else if(this.state.email == ""){
            this.setState({message:"Email field is empty"})
        } else if(this.state.name == ""){
            this.setState({message:"Name field is empty"})
        } else if(this.state.password == ""){
            this.setState({message:"Password field is empty"})
        } else if(this.state.rid == ""){
            this.setState({message:"Role id field is empty"})
        } else{
            var user = {"email":this.state.email, "name":this.state.name, "password":this.state.password, "rid":this.state.rid};
            ProjectAPI.updateUser(this.state.olduserid, user).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        this.setState({message:"User updating completed"})
                    } else if(result == -1){
                        this.setState({message:"This role did'nt found"})
                    } else if(result == 0){
                        this.setState({message:"You can not use this email address"})
                    } else{
                        this.setState({message:"Old user id not found"})
                    }
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Update User</h4>
                <div>
                    <table  border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>New User Information</i></td>
                            </tr>
                            <tr>
                                <td><b>User Email: </b></td>
                                <td><input type="text" name="email" value={this.state.email} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>User Name: </b></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>User Password: </b></td>
                                <td><input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>User Role ID: </b></td>
                                <td><input type="number" name="rid" value={this.state.rid} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><i>Old User Information: </i></td>
                            </tr>
                            <tr>
                                <td><b>Old User ID: </b></td>
                                <td><input type="text" name="olduserid" value={this.state.olduserid} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit"/></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>{this.state.message}</div>
                </div>
            </div>
        )
    }
}

export default UpdateUser;