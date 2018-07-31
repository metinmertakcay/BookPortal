import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class InsertUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: "", name: "", password: "", rid: "" }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clickHandler() {
        if (this.state.email === "") {
            { alert("User Email Is Missing") }
        } else if (this.state.name === "") {
            { alert("User Name Is Missing") }
        } else if (this.state.password === "") {
            { alert("User Password Is Missing") }
        } else if (this.state.rid === "") {
            { alert("User Role Is Missing") }
        } else {
            // BU KISIMDA KİTAP EKLEME İŞLEMİ YAPILACAK
            var newUser = { "email": this.state.email, "name": this.state.name, "password": this.state.password, "rid": this.state.rid };
            ProjectAPI.saveUser(newUser).then((result) => {
                if (result == 1) {
                    { alert("User Added Database") }
                } else if (result == -3) {
                    { alert("This Role Not Found") }
                } else {
                    { alert("This Email Using Another Person") }
                }
            });
        }
    }

    render() {
        return (
            <div align="center">
                <h4>Create a New User</h4>
                <form>
                    <table border="1">
                        <tbody>
                            <tr>
                                <td colSpan="2" align="center"><i>User Information</i></td>
                            </tr>
                            <tr>
                                <td><b>User Email: </b></td>
                                <td><input type="email" name="email" value={this.state.email} onChange={this.handleChange} /></td>
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
                                <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default InsertUser;