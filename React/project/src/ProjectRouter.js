import React from "react"
import {Switch, Route, Redirect} from "react-router-dom"
import Admin from './ProjectAdminLink'
import User from './ProjectUserLink'

import InsertWriter from './ProjectAddWriter'
import UpdateWriter from './ProjectUpdateWriter'
import DeleteWriter from './ProjectDeleteWriter'

import SearchUser from './ProjectSearchUser'
import InsertUser from './ProjectAddUser'
import UpdateUser from './ProjectUpdateUser'
import DeleteUser from "./ProjectDeleteUser";

import SearchAllBook from './ProjectSearchAllBook'
import SearchBook from './ProjectSearchBook'
import InsertBook from './ProjectAddBook'
import UpdateBook from './ProjectUpdateBook'
import DeleteBook from './ProjectDeleteBook'

const ProjectRouter = () => (
    <Switch>
        <Route exact path="/" render={() => <Redirect replace to="admin"/>} />
        <Route path="/admin" component={Admin}/>
        
        <Route path="/insert/writer" component={InsertWriter}/>
        <Route path="/update/writer" component={UpdateWriter}/>
        <Route path="/delete/writer" component={DeleteWriter}/>

        <Route path="/search/user" component={SearchUser}/>
        <Route path="/insert/user" component={InsertUser}/>
        <Route path="/update/user" component={UpdateUser}/>
        <Route path="/delete/user" component={DeleteUser}/>

        <Route path="/search/user" component={SearchUser}/>
        <Route path="/insert/user" component={InsertUser}/>
        <Route path="/update/user" component={UpdateUser}/>
        <Route path="/delete/user" component={DeleteUser}/>

        <Route path="/search/all/book" component={SearchAllBook}/>
        <Route path="/search/book" component={SearchBook}/>
        <Route path="/insert/book" component={InsertBook}/>
        <Route path="/update/book" component={UpdateBook}/>
        <Route path="/delete/book" component={DeleteBook}/>

        <Route exact path="/" render={() => <Redirect replace to="user"/>} />
        <Route path="/user" component={User}/>
        <Route path="/search/all/book" component={SearchAllBook}/>
        <Route path="/search/book" component={SearchBook}/>
    </Switch>
);

export default ProjectRouter;