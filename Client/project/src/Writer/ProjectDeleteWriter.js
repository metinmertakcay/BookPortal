import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

function Deletion(props){
    if(props.result == 1){
        return <b>Writer Deleted</b>
    } else{
        if(props.first){
            return ""
        } else{
            return <b>This writer not found</b>
        }
    }
}

class DeleteWriter extends React.Component{
    constructor(props){
        super(props)
        this.state = {input:"", result:0, first:true}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.input != ""){
            // CONTROL AND DELETE DATABASE IF WRITER EXIST
            ProjectAPI.deleteWriter(this.state.input).then((result) =>{
                if(result == 1){
                    this.setState({result:1, first:false})
                } else{
                    this.setState({result:0, first:false})
                }
            });
        } else{
            {alert("Enter Writer Id")}
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Delete Writer</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>Writer ID: </b></td>
                            <td><input type="number" name="input" onChange={this.handleChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button name="Select" clickHandler={this.clickHandler}/></td>
                        </tr>
                    </tbody>
                </table>
                <Deletion result={this.state.result} first={this.state.first}/>
            </div>
        )
    }
}

export default DeleteWriter;