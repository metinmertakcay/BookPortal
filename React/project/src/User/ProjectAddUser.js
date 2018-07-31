import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class InsertUser extends React.Component{
    constructor(props){
        super(props)
        this.state = {email:"", name:"", password:"", rid:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.email === ""){
            this.setState({message:"User email is missing"})
        } else if(this.state.name === ""){
            this.setState({message:"User name is missing"})
        } else if(this.state.password === ""){
            this.setState({message:"User password is missing"})
        } else if(this.state.rid === ""){
            this.setState({message:"User role is missing"})
        } else{
            this.setState({message:""})
            // BU KISIMDA KİTAP EKLEME İŞLEMİ YAPILACAK
            var newUser = {"email":this.state.email, "name":this.state.name, "password":this.state.password, "rid":this.state.rid};
            ProjectAPI.saveUser(newUser).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        this.setState({message:"User adding completed"})
                    } else if(result == -1){
                        this.setState({message:"This role did'nt found"})
                    } else{
                        this.setState({message:"You can not use this email address"})
                    }
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Create a New User</h4>
                <form>
                    <table  border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>User Information</i></td>
                            </tr>
                            <tr>
                                <td><b>User Email: </b></td>
                                <td><input type="email" name="email" value={this.state.email} onChange={this.handleChange}/></td>
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
                                <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div>{this.state.message}</div>
            </div>
        )
    }
}

export default InsertUser;