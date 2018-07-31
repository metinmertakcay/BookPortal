import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';

function Item(props){
    return(
        <tr>
            <td>{props.item.uid}</td>
            <td>{props.item.wid}</td>
            <td>{props.item.name}</td>
        </tr>
    )
}

function ShowBooks(props){
    return(
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <th>User ID</th>
                        <th>Writer ID</th>
                        <th>Book Name</th>
                    </tr>
                    {
                        props.books.map(function(item, i){
                            return <Item key={i} item={item}/>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

class SearchAllBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {books:[]}
    }

    componentDidMount(){
        ProjectAPI.getAllBook().then((books) =>{
            if(!books || books.hasOwnProperty('error')){
                this.setState({books:[]})
            } else{
                this.setState({books:books})
            }
        });
    }

    render(){
        return(
            <div align="center">
                <h4>All Books</h4>
                <br/><ShowBooks books={this.state.books}/>
            </div>
        )
    }
}

export default SearchAllBook;