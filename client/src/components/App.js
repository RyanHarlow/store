import React, {useEffect} from 'react';
import './App.css';
import 'bulma/css/bulma.css'
import { connect } from "react-redux";
import { setLoggedIn } from "../actions/index";
import Nav from './Nav';
import axios from 'axios';
import {Switch, Route} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';


function mapDispatchToProps(dispatch) {
    return {
        setLoggedIn: logged => dispatch(setLoggedIn(logged))
    };
}

const mapStateToProps = state => {
    return { isLoggedIn: state.isLoggedIn };
};


function App(props) {

    useEffect(() => {
        axios.get('/api/person')
            .then(res => {
                if (!res.data.user) {
                    props.setLoggedIn(false);
                }else if(res.data.user){
                    props.setLoggedIn(true);
                }
            }).catch(err => {
            props.setLoggedIn(false);
            console.log(err);
        })
    }, []);


  return (
    <div className="App">
      <Nav />
        <Switch>
            <Route exact path={'/'}>
                <Home />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/signup">
                <Signup />
            </Route>
        </Switch>
    </div>
  );
}

const connectedApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default connectedApp;
