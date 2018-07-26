import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import ProjectRouter from './ProjectRouter'

import InsertBook from './ProjectAddBook'
import InsertUser from './ProjectAddUser'
import InsertWriter from './ProjectAddWriter'

import DeleteBook from './ProjectDeleteBook'
import DeleteUser from './ProjectDeleteUser'
import DeleteWriter from './ProjectDeleteWriter'

import UpdateBook from './ProjectUpdateBook'
import UpdateUser from './ProjectUpdateUser'
import UpdateWriter from './ProjectUpdateWriter'

import SearchUser from './ProjectSearchUser'
import SearchBook from './ProjectSearchBook'

import SearchAllBook from './ProjectSearchAllBook'

import Login from './Login'

//ReactDOM.render(<Login/>, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter>
        <ProjectRouter/>
    </BrowserRouter>
    ,document.getElementById('root')
)

registerServiceWorker();
