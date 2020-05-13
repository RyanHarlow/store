import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import { setLoggedIn } from "../actions/index";


function mapDispatchToProps(dispatch) {
    return {
        setLoggedIn: logged => dispatch(setLoggedIn(logged))
    };
}

const mapStateToProps = state => {
    return { isLoggedIn: state.isLoggedIn };
};

function Login(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios.post('/api/person/login', {email, password})
            .then(res => {
                if(res.data.success){
                    props.setLoggedIn(true)
                }else{
                    console.log(res.data.err)
                }
            })
    }
if(!props.isLoggedIn) {
    return (
        <div>
            <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={'email'}/>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password'/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}else{
    return(
        <Redirect to="/" />
    )
}
}

const connectedLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default connectedLogin;