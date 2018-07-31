import React from 'react';
import * as ProjectAPI from './ProjectAPI';

class Button extends React.Component{
    render(){
        return(
            <button
                type="button" 
                onClick = {() => {this.props.clickHandler()}}>{this.props.name}
            </button>
        )
    }
}

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
            <div>
                <div align="center">
                    <label>Old Writer ID:<input type="number" name="oldwriterid" value={this.state.oldwriterid} onChange={this.handleChange}/></label><br/><br/>
                </div>

                <div align="center">
                    <form>
                            <label>New Writer Information</label>
                            <table  border="1">
                                <tbody>
                                    <tr>
                                        <td>Writer Name: </td>
                                        <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>Writer Surname: </td>
                                        <td><input type="text" name="surname" value={this.state.surname} onChange={this.handleChange}/></td>
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