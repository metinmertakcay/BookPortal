import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class InsertBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {userid:"", writerid:"", name:"", message:"", result:0}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.userid === ""){
            this.setState({message:"User id is missing"})
        } else if(this.state.writerid === ""){
            this.setState({message:"Writer id is missing"})
        } else if(this.state.name === ""){
            this.setState({message:"Name is missing"})
        } else{
            // BU KISIMDA KİTAP EKLEME İŞLEMİ YAPILACAK
            var newBooks = {"uid":this.state.userid, "wid":this.state.writerid, "name":this.state.name};
            ProjectAPI.saveBook(newBooks).then((result) =>{
                if(result == null){
                    this.setState({message:"Error happen"})
                } else{
                    if(result == 1){
                        this.setState({message:"Book adding completed"})
                    } else if(result == 0){
                        this.setState({message:"Writer not found"})
                    } else if(result == -1){
                        this.setState({message:"User not found"})
                    } else{
                        this.setState({message:"This book adding already db"})
                    }
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
                <div>{this.state.message}</div>
            </div>
        )
    }
}

export default InsertBook;