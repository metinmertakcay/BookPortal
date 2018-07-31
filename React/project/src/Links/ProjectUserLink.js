import React from 'react';
import { Link } from 'react-router-dom'

class User extends React.Component{
    render(){
        return(
            <div>
                <h4>Kitap İşlemleri</h4>
                <ul>
                    <h5>Search Operations</h5>
                    <li><Link to={"/search/book"}>Search Book</Link><br/></li>
                    <li><Link to={"/search/all/book"}>Look at All Book</Link><br/></li>
                    <h5>List Operations</h5>
                    <li><Link to={"/book/add_list"}>Add Book User List</Link><br/></li>
                </ul>
            </div>
        )
    }
}

export default User;