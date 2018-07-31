import React from 'react';
import Button from "../Component/Button"
import * as ProjectAPI from '../Api/ProjectAPI';

class SelectList extends React.Component{
    constructor(props){
        super(props)
        this.state = {name:props.location.state.name, bid:props.location.state.bid, result:0}
        this.clickHandler = this.clickHandler.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
        ProjectAPI.getListInformation(3, this.state.bid).then((result) =>{
            this.setState({result:result})
        });
    }

    handleChange(event){
        // CHECK DIFFERENCES
        this.setState({[event.target.name]: event.target.value});
    }

    clickHandler(){
        //DETECT AN WRITE DATABASE USER
        if(this.state.result != 0){
            ProjectAPI.addListInformation(3, this.state.bid, this.state.result).then(() =>{
                // ESKI SAYFAYA YÖNLENDIR
            });
        }
    }

    render(){
        return(
            <div align="center">
                <h4>ADD A LIST</h4>
                <img src={require("../book.jpg")} alt={this.state.name} width="300" height="300"/><br/>
                <b><div className="book">{this.state.name}</div></b><br/>
                <label>READ<input type="radio" name="result" checked={this.state.result == 1 } value={1} onChange={this.handleChange}/></label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label>FAVOURITE<input type="radio" name="result" checked={this.state.result == 2 } value={2} onChange={this.handleChange}/></label><br/><br/>
                <Button clickHandler={this.clickHandler} name="Submit"/>
                <div>{this.state.result}</div>
            </div>
        )
    }
}

export default SelectList;