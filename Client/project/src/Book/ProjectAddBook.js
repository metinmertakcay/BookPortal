import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class InsertBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {userid:"", writerid:"", name:"", result:0}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.userid === ""){
            {alert("User Id Is Missing")}
        } else if(this.state.writerid === ""){
            {alert("Writer Id Is Missing")}
        } else if(this.state.name === ""){
            {alert("Name Is Missing")}
        } else{
            // BU KISIMDA KİTAP EKLEME İŞLEMİ YAPILACAK
            var newBooks = {"uid":this.state.userid, "wid":this.state.writerid, "name":this.state.name};
            ProjectAPI.saveBook(newBooks).then((result) =>{
                if(result == 1){
                    {alert("Book Added Database")}
                } else if(result == 0){
                    {alert("Requested Writer Not Found In Database")}
                } else if(result == -1){
                    {alert("Requested User Not Found In Database")}
                } else{
                    {alert("This Book Is Located In The Database")}
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Add a New Book</h4>
                <form>
                    <table border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>Book Information</i></td>
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
                                <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default InsertBook;