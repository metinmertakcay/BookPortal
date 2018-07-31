import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

function Item(props) {
    return (
        <table border="1">
            <tbody>
                <tr>
                    <th>User Name</th>
                    <th>Writer Name</th>
                    <th>Book Name</th>
                </tr>
                <tr>
                    <td>{props.item.userName}</td>
                    <td>{props.item.writerName}</td>
                    <td>{props.item.bookName}</td>
                </tr>
            </tbody>
        </table>
    )
}

function ShowBooks(props) {
    return (
        <div>
            {
                props.books.map(function (item, i) {
                    return <Item key={i} item={item} />
                })
            }
        </div>
    )
}

function Print(props) {
    if (props.books.length == 0) {
        if (!props.first) {
            { alert("Book Not Found") }
            return ""
        }
        else {
            return ""
        }
    } else {
        return ""
    }
}

class SearchBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = { search: "", books: [], first: true }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clickHandler() {
        if (this.state.search != "") {
            ProjectAPI.getBookFormat(this.state.search).then((books) => {
                if (!books || books.hasOwnProperty('error')) {
                    this.setState({ books: [], first: false })
                } else {
                    this.setState({ books: books, first: false })
                }
            });
        } else {
            { alert("Book Name Field Is Missing") }
        }
    }

    render() {
        return (
            <div align="center">
                <h4>Search Book</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>Enter a book name: </b></td>
                            <td><input type="text" name="search" onChange={this.handleChange}></input></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button name="Search" clickHandler={this.clickHandler} /></td>
                        </tr>
                    </tbody>
                </table>
                <Print books={this.state.books} first={this.state.first} />
                <br /><ShowBooks books={this.state.books} />
            </div>
        )
    }
}

export default SearchBook;