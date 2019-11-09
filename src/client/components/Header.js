import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const authButton = (auth) => (
    (!auth) ? <a href="/api/auth/google">Login</a> : <a href="/api/logout">Logout</a>
);

const Header = ({ auth }) => {
    return  <nav>
        <Link to="/" className="brand-logo" >React SSR</Link>
        <ul className="right hide-on-med-and-down"> 
            <li>
                {authButton(auth)}
            </li>
        </ul>
    </nav>
}

export default connect(
    ({auth}) => ({auth})
)(Header);