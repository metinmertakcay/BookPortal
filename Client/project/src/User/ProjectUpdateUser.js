import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class UpdateUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = { olduserid: "", email: "", name: "", password: "", rid: "" }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clickHandler() {
        if (this.state.olduserid == "") {
            { alert("Old User Id Field Is Empty") }
        } else if (this.state.email == "") {
            { alert("Email Field Is Empty") }
        } else if (this.state.name == "") {
            { alert("Name Field Is Empty") }
        } else if (this.state.password == "") {
            { alert("Password Field Is Empty") }
        } else if (this.state.rid == "") {
            { alert("Role Id Field Is Empty") }
        } else {
            var user = { "email": this.state.email, "name": this.state.name, "password": this.state.password, "rid": this.state.rid };
            ProjectAPI.updateUser(this.state.olduserid, user).then((result) => {
                if (result == 1) {
                    { alert("User Updated") }
                } else if (result == -3) {
                    { alert("This Role Not Found") }
                } else if (result == -4) {
                    { alert("This Email Using Another Person") }
                } else {
                    { alert("User Id Not Found") }
                }
            });
        }
    }

    render() {
        return (
            <div align="center">
                <h4>Update User</h4>
                <div>
                    <table border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>New User Information</i></td>
                            </tr>
                            <tr>
                                <td><b>User Email: </b></td>
                                <td><input type="text" name="email" value={this.state.email} onChange={this.handleChange} /></td>
                            </tr>
                            <tr>
                                <td><b>User Name: </b></td>
                                <td><input type="text" name="name" value={this.state.name} onChange={this.handleChange} /></td>
                            </tr>
                            <tr>
                                <td><b>User Password: </b></td>
                                <td><input type="password" name="password" value={this.state.password} onChange={this.handleChange} minLength="4" /></td>
                            </tr>
                            <tr>
                                <td><b>User Role ID: </b></td>
                                <td><input type="number" name="rid" value={this.state.rid} onChange={this.handleChange} min="0" max="2" /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><i>Old User Information: </i></td>
                            </tr>
                            <tr>
                                <td><b>Old User ID: </b></td>
                                <td><input type="text" name="olduserid" value={this.state.olduserid} onChange={this.handleChange} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit" /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default UpdateUser;