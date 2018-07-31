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
                <form>
                    <label>Enter Writer ID: <input type="number" name="input" onChange={this.handleChange}/></label>
                    <Button name="Select" clickHandler={this.clickHandler}/>
                </form>
                <Deletion result={this.state.result} first={this.state.first}/>
            </div>
        )
    }
}

export default DeleteWriter;