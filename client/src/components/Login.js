import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import axios from 'axios';
import { setLoggedIn } from "../actions/index";
import '../css/Login.css'


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
    const [err, setError] = useState('')

    const handleSubmit = () => {
        axios.post('/api/person/login', {email, password})
            .then(res => {
                if(res.data.success){
                    props.setLoggedIn(true)
                }else{
                    console.log(res.data.err);
                    setError(res.data.err);
                }
            })
    }

if(!props.isLoggedIn) {
    return (
        <div className={'login-form'}>
        <div className="field">
            <label className="label">Email</label>
            <div className="control">
                <input  onChange={(e) => setEmail(e.target.value)} value={email} placeholder={'email'} className="input" type="text" />
            </div>
        </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password' className="input" type="password" />
                </div>
            </div>


    <div className="field is-grouped">
        <div className="control">
            <button onClick={handleSubmit} className="button is-link">Submit</button>
        </div>
        <div className="control">
            <Link to={'/'}>
            <button className="button is-link is-light">Cancel</button>
            </Link>
        </div>
    </div>
            <p className="help is-danger">{err}</p>


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

 //<div>
    //        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={'email'}/>
    //      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password'/>
    //    <button onClick={handleSubmit}>Submit</button>
    //</div>

export default connectedLogin;