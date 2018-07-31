import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

function Deletion(props){
    if(props.result == 1){
        return <b>User Deleted</b>
    } else{
        if(props.first){
            return ""
        } else{
            return <b>This user not found</b>
        }
    }
}

class DeleteUser extends React.Component{
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
            // CONTROL AND DELETE DATABASE IF USER EXIST
            ProjectAPI.deleteUser(this.state.input).then((result) =>{
                if(result == null){
                    this.setState({result:-1, first:false})
                } else{
                    if(result == 1){
                        this.setState({result:1, first:false})
                    } else{
                        this.setState({result:0, first:false})
                    }
                }
            });
        } else{
            this.setState({first:true, message:"Please fill all place"})
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Delete User</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <th><b>User ID:</b></th>
                            <th><input type="number" name="input" onChange={this.handleChange}/></th>
                        </tr>
                        <tr>
                            <th colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Select"/></th>
                        </tr>
                    </tbody>
                </table>
                <Deletion result={this.state.result} first={this.state.first}/>
            </div>
        )
    }
}

export default DeleteUser;