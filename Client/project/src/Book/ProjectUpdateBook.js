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
            {alert("Old Book Id Field Is Empty")}
        } else if(this.state.userid == ""){
            {alert("User Id Field Is Empty")}
        } else if(this.state.writerid == ""){
            {alert("Writer Id Field Is Empty")}
        }else if(this.state.name == ""){
            {alert("Name Field Is Empty")}
        } else{
            var book = {"uid":this.state.userid, "wid":this.state.writerid, "name":this.state.name};
            ProjectAPI.updateBook(this.state.oldbookid, book).then((result) =>{
                if(result == 1){
                    {alert("Book Updated")}
                } else if(result == -1){
                    {alert("Requested Writer Not Found")}
                } else if(result == -2){
                    {alert("Requested User Not Found")}
                } else if(result == -6){
                    {alert("This Book Is Already Located In The Database")}
                } else{
                    {alert("Old Book Id Not Found")}
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