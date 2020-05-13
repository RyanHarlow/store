import React from 'react';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';




const mapStateToProps = state => {
    return { isLoggedIn: state.isLoggedIn };
};

function Nav(props){
    console.log(props)

    let buttons = null;
    console.log(props.isLoggedIn)
    if(props.isLoggedIn === true){
        buttons = (
            <div className="buttons">
                <button className="button is-light">
                    <strong>Logout</strong>
                </button>
            </div>
        )
    }
    if(props.isLoggedIn === false){
        buttons = (
            <div className="buttons">
                <Link to='/signup'>
                <button className="button is-light">
                    <strong>Sign up</strong>
                </button>
                </Link>
                <Link to='/login'>
                <button className="button is-light">
                    <strong>
                        Log in
                    </strong>
                </button>
                    </Link>
            </div>
        )
    }




    return(
        <nav className="navbar is-black" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <strong>
                        Store
                    </strong>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu is-active">
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                    <a className="navbar-item">
                        Documentation
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider" />
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                        </div>
                    </div>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        {buttons}
                    </div>
                </div>
            </div>
        </nav>
)
}


export default connect(
    mapStateToProps
)(Nav);
