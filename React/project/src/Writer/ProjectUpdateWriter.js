import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class UpdateWriter extends React.Component{
    constructor(props){
        super(props)
        this.state = {oldwriterid:"", name:"", surname:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.oldwriterid == ""){
            this.setState({message:"Old writer id field is empty"})
        } else if(this.state.name == ""){
            this.setState({message:"Name field is empty"})
        }
        else if(this.state.surname == ""){
            this.setState({message:"Surname field is empty"})
        } else{
            var writer = {"name":this.state.name, "surname":this.state.surname};
            ProjectAPI.updateWriter(this.state.oldwriterid, writer).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        this.setState({message:"Writer updated"})
                    } else{
                        this.setState({message:"Writer not found"})
                    }
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Update Writer</h4>
                <div>
                    <form>
                        <table border="1">
                            <tbody>
                                <tr>
                                    <td colSpan="2" align="center"><i>New Writer Information</i></td>
                                </tr>
                                <tr>
                                    <td><b>Writer Name: </b></td>
                                    <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></td>
                                </tr>
                                <tr>
                                    <td><b>Writer Surname: </b></td>
                                    <td><input type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" align="center"><i>Old Writer Information</i></td>
                                </tr>
                                <tr>
                                    <td><b>Old Writer ID: </b></td>
                                    <td><input type="number" name="oldwriterid" value={this.state.oldwriterid} onChange={this.handleChange}/></td>
                                </tr>
                                <tr>
                                    <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                    <div>{this.state.message}</div>
                </div>
            </div>
        )
    }
}

export default UpdateWriter;