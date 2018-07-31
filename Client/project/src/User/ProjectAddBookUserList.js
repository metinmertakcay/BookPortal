import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import { Link } from 'react-router-dom'
import './ProjectAddBookUserList.css';

function Item(props) {
    return (
        <div className="column">
            <br /><br />
            <Link to={{ pathname: "/select/alist", state: { name: props.item.name, bid: props.item.bid } }}><img src={require("../book.jpg")} alt={props.item.name} width="150" height="150" /><br /></Link>
            <b><div className="book">{props.item.name}</div></b>
        </div>
    )
}

function ShowBooks(props) {
    return (
        <div className="row">
            {
                props.books.map(function (item, i) {
                    return <Item key={i} item={item} />
                })
            }
        </div>
    )
}

class AddBookUserList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [] }
    }

    componentDidMount() {
        ProjectAPI.getAllBook().then((books) => {
            if (!books || books.hasOwnProperty('error')) {
                this.setState({ books: [] })
            } else {
                this.setState({ books: books })
            }
        });
    }

    render() {
        return (
            <div align="center">
                <h3>ADD ITEM USER LIST</h3>
                <h5>BOOKS</h5>
                <ShowBooks books={this.state.books} />
            </div>
        )
    }
}

export default AddBookUserList;