import React from 'react';
import { Link } from 'react-router-dom'

class User extends React.Component{
    render(){
        return(
            <div>
                <label>Kitap İşlemleri</label><br/>
                <ul>
                    <li><Link to={"/search/all/book"}>Search All Book</Link><br/></li>
                    <li><Link to={"/search/book"}>Search Book</Link><br/></li>
                </ul>
            </div>
        )
    }
}

export default User;