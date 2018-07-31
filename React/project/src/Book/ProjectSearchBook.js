import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

function Item(props){
    return(
        <table border="1">
            <tbody>
                <tr>
                    <th>Book ID</th>
                    <th>Writer ID</th>
                    <th>Book Name</th>
                </tr>
                <tr>
                    <td>{props.item.uid}</td>
                    <td>{props.item.wid}</td>
                    <td>{props.item.name}</td>
                </tr>
            </tbody>
        </table>
    )
}

function ShowBooks(props){
    return(
        <div>
            {
                props.books.map(function(item, i){
                    return <Item key={i} item={item}/>
                })
            }
        </div>
    )
}

function Print(props){
    if(props.books.length == 0){
        if(!props.first){
            return <b>Book not found</b>
        }
        else{
            return <b>{props.message}</b>
        }
    } else{
        if(props.message != ""){
            return <b>{props.message}</b>
        } else{
            return props.message
        }
    }
}

class SearchBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {search:"", books:[], message:"", first:true}
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event){
        this.setState({[event.target.name]:event.target.value})
    }

    clickHandler(){
        if(this.state.search != ""){
            ProjectAPI.getBook(this.state.search).then((books) =>{
                if(!books || books.hasOwnProperty('error')){
                    this.setState({books:[], first:false})
                } else{
                    this.setState({books:books, message:"", first:false})
                }
            });
        } else{
            this.setState({users:[], message:"Please enter something"})
        }
    }

    render(){
        return(
            <div align="center">
                <h4>Search Book</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>Enter a book name: </b></td>
                            <td><input type="text" name="search" onChange={this.handleChange}></input></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button name="Search" clickHandler={this.clickHandler}/></td>
                        </tr>
                    </tbody>
                </table>
                <Print message={this.state.message} books={this.state.books} first={this.state.first}/>
                <br/><ShowBooks books={this.state.books}/>
            </div>
        )
    }
}

export default SearchBook;