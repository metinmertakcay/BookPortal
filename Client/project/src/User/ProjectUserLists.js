import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';

function Item(props) {
    return (
        <tr>
            <td>{props.item.name}</td>
        </tr>
    )
}

class GetList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { sid: props.location.state.sid, books: [] }
    }

    componentDidMount() {
        ProjectAPI.getUserList(this.state.sid).then((books) => {
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
                <h4>List</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <th>Book Name</th>
                        </tr>
                        {
                            this.state.books.map(function (item, i) {
                                return <Item key={i} item={item} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GetList;