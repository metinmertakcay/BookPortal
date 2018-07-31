import React from 'react';
import * as ProjectAPI from '../Api/ProjectAPI';
import Button from "../Component/Button"

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { email: "", password: "" }
        this.handleChange = this.handleChange.bind(this)
        this.clickHandler = this.clickHandler.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    clickHandler() {
        if (this.state.email == "") {
            { alert("Email Field Is Empty") }
        } else if (this.state.password == "") {
            { alert("Password Field Is Empty") }
        } else {
            var user = { email: this.state.email, password: this.state.password }
            ProjectAPI.getUserForAuth(user).then((result) => {
                if (result == 1) {
                    // Admin
                    this.props.history.push("/admin")
                } else if (result == 0) {
                    // User
                    this.props.history.push("/user")
                } else {
                    { alert("Wrong Email or Password") }
                }
            });
        }
    }

    render() {
        return (
            <div align="center">
                <h3>Login</h3>
                <table border="1">
                    <tbody>
                        <tr>
                            <td><b>Email:</b></td>
                            <td><input type="email" name="email" value={this.state.email} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td><b>Password:</b></td>
                            <td><input type="password" name="password" value={this.state.password} onChange={this.handleChange} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="center"><Button clickHandler={this.clickHandler} name="Submit" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Login;