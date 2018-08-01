import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';

function Item(props) {
    return (
        <tr>
            <td>{props.item.userName}</td>
            <td>{props.item.writerName}</td>
            <td>{props.item.writerSurname}</td>
            <td>{props.item.bookName}</td>
        </tr>
    )
}

function ShowBooks(props) {
    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <th>User Name</th>
                        <th>Writer Name</th>
                        <th>Writer Surname</th>
                        <th>Book Name</th>
                    </tr>
                    {
                        props.books.map(function (item, i) {
                            return <Item key={i} item={item} />
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

class SearchAllBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = { books: [] }
    }

    componentDidMount() {
        ProjectAPI.getAllBookFormat().then((books) => {
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
                <h4>All Books</h4>
                <br /><ShowBooks books={this.state.books} />
            </div>
        )
    }
}

export default SearchAllBook;