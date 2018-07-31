import React from 'react';
import { Link } from 'react-router-dom'

class Admin extends React.Component{
    render(){
        return(
            <div>
                <label>Yazar işlemleri</label><br/>
                <ul>
                    <li><Link to={"/insert/writer"}>Insert Writer</Link><br/></li>
                    <li><Link to={"/update/writer"}>Update Writer</Link><br/></li>
                    <li><Link to={"/delete/writer"}>Delete Writer</Link><br/></li>
                </ul>
                <label>Kullanıcı işlemleri</label><br/>
                <ul>
                    <li><Link to={"/search/user"}>Search User</Link><br/></li>
                    <li><Link to={"/insert/user"}>Insert User</Link><br/></li>
                    <li><Link to={"/update/user"}>Update User</Link><br/></li>
                    <li><Link to={"/delete/user"}>Delete User</Link><br/></li>
                </ul>
                <label>Kitap İşlemleri</label><br/>
                <ul>
                    <li><Link to={"/search/all/book"}>Search All Book</Link><br/></li>
                    <li><Link to={"/search/book"}>Search Book</Link><br/></li>
                    <li><Link to={"/insert/book"}>Insert Book</Link><br/></li>
                    <li><Link to={"/update/book"}>Update Book</Link><br/></li>
                    <li><Link to={"/delete/book"}>Delete Book</Link><br/></li>
                </ul>
            </div>
        )
    }
}

export default Admin;