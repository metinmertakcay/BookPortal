import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import Admin from './Links/ProjectAdminLink'
import User from './Links/ProjectUserLink'

import InsertWriter from './Writer/ProjectAddWriter'
import UpdateWriter from './Writer/ProjectUpdateWriter'
import DeleteWriter from './Writer/ProjectDeleteWriter'

import SearchUser from './User/ProjectSearchUser'
import InsertUser from './User/ProjectAddUser'
import UpdateUser from './User/ProjectUpdateUser'
import DeleteUser from "./User/ProjectDeleteUser";
import Login from './User/ProjectLogin'
import AddBookUserList from './User/ProjectAddBookUserList'
import SelectList from './User/ProjectSelectListForBook'

import SearchAllBook from './Book/ProjectSearchAllBook'
import SearchBook from './Book/ProjectSearchBook'
import InsertBook from './Book/ProjectAddBook'
import UpdateBook from './Book/ProjectUpdateBook'
import DeleteBook from './Book/ProjectDeleteBook'

const ProjectRouter = () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect replace to="login" />} />
        <Route path="/admin" component={Admin} />

        <Route path="/insert/writer" component={InsertWriter} />
        <Route path="/update/writer" component={UpdateWriter} />
        <Route path="/delete/writer" component={DeleteWriter} />

        <Route path="/search/user" component={SearchUser} />
        <Route path="/insert/user" component={InsertUser} />
        <Route path="/update/user" component={UpdateUser} />
        <Route path="/delete/user" component={DeleteUser} />

        <Route path="/search/user" component={SearchUser} />
        <Route path="/insert/user" component={InsertUser} />
        <Route path="/update/user" component={UpdateUser} />
        <Route path="/delete/user" component={DeleteUser} />

        <Route path="/search/all/book" component={SearchAllBook} />
        <Route path="/search/book" component={SearchBook} />
        <Route path="/insert/book" component={InsertBook} />
        <Route path="/update/book" component={UpdateBook} />
        <Route path="/delete/book" component={DeleteBook} />

        <Route path="/login" component={Login} />

        <Route exact path="/" render={() => <Redirect replace to="user" />} />
        <Route path="/user" component={User} />
        <Route path="/search/all/book" component={SearchAllBook} />
        <Route path="/search/book" component={SearchBook} />
        <Route path="/book/add_list" component={AddBookUserList} />
        <Route path="/select/alist" component={SelectList} />
    </Switch>
);

export default ProjectRouter;