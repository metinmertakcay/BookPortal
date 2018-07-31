import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

function Item(props) {
    return (
        <table border="1">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                <tr>
                    <td>{props.item.name}</td>
                    <td>{props.item.email}</td>
                </tr>
            </tbody>
        </table>
    )
}

function ShowUsers(props) {
    return (
        <div>
            {
                props.users.map(function (item, i) {
                    return <Item key={i} item={item} />
                })
            }
        </div>
    )
}

function Print(props) {
    if (props.users.length == 0) {
        if (!props.first) {
            { alert("User Not Found") }
            return ""
        }
        else {
            return ""
        }
    } else {
        return ""
    }
}

class SearchUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = { search: "", users: [], first: true }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clickHandler() {
        if (this.state.search != "") {
            ProjectAPI.getUser(this.state.search).then((users) => {
                if (!users || users.hasOwnProperty('error')) {
                    this.setState({ users: [], first: false })
                } else {
                    this.setState({ users: users, first: false })
                }
            });
        } else {
            { alert("Enter User Name") }
        }
    }

    render() {
        return (
            <div align="center">
                <h4>Search User</h4>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>User Name: </b></td>
                            <td><input type="text" name="search" onChange={this.handleChange}></input></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Search" /></td>
                        </tr>
                    </tbody>
                </table>
                <Print users={this.state.users} first={this.state.first} />
                <br /><ShowUsers users={this.state.users} />
            </div>
        )
    }
}

export default SearchUser;