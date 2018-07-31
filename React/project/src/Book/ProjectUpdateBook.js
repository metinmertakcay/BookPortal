import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class UpdateBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {oldbookid:"", userid:"", writerid:"", name:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.oldbookid == ""){
            this.setState({message:"Old book id field is empty"})
        } else if(this.state.userid == ""){
            this.setState({message:"User id field is empty"})
        } else if(this.state.writerid == ""){
            this.setState({message:"Writer id field is empty"})
        }else if(this.state.name == ""){
            this.setState({message:"Name field is empty"})
        } else{
            var book = {"uid":this.state.userid, "wid":this.state.writerid, "name":this.state.name};
            ProjectAPI.updateBook(this.state.oldbookid, book).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        this.setState({message:"Book updating completed"})
                    } else if(result == 0){
                        this.setState({message:"Writer not found"})
                    } else if(result == -1){
                        this.setState({message:"User not found"})
                    } else if(result == -2){
                        this.setState({message:"This book adding already db"})
                    } else{
                        this.setState({message:"Old book id not found"})
                    }
                }
            });
        }        
    }

    render(){
        return(
            <div align="center">
                <h4>Update Book</h4>
                <div>
                    <table  border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>New Book Information</i></td>
                            </tr>
                            <tr>
                                <td><b>User ID: </b></td>
                                <td><input type="text" name="userid" value={this.state.userid} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>Writer ID: </b></td>
                                <td><input type="text" name="writerid" value={this.state.writerid} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>Book Name: </b></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><i>Old Book Information</i></td>
                            </tr>
                            <tr>
                                <td><b>Old Book ID: </b></td>
                                <td><input type="text" name="oldbookid" value={this.state.oldbookid} onChange={this.handleChange}/></td>
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

export default UpdateBook;