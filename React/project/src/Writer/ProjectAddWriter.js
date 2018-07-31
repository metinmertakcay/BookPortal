import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class InsertWriter extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:"", surname:"", message:""}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.name === ""){
            this.setState({message:"Writer name is missing"})
        } else if(this.state.surname === ""){
            this.setState({message:"Writer surname is missing"})
        } else{
            this.setState({message:""})
            // BU KISIMDA WRITER EKLEME İŞLEMİ YAPILACAK
            var newWriter = {"name":this.state.name, "surname":this.state.surname};
            ProjectAPI.saveWriter(newWriter).then((result) =>{
                if(result == null){
                    this.setState({message:"Error occured"})
                } else{
                    if(result == 1){
                        this.setState({message:"Writer adding completed"})
                    } else{
                        this.setState({message:"Writer already added db"})
                    }
                }
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Add a New Writer</h4>
                <form>
                    <table  border="1">
                        <tbody>
                            <tr>
                                <td><b>Writer Name: </b></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><b>Writer Surname: </b></td>
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
        )
    }
}

export default InsertWriter;