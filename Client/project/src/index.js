import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import ProjectRouter from './ProjectRouter'

//ReactDOM.render(<AddBookList/>, document.getElementById('root'));
//ReactDOM.render(<Login/>, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter>
        <ProjectRouter />
    </BrowserRouter>
    , document.getElementById('root')
)

registerServiceWorker();
