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

function Signup(props){

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
            <div className={'login-form'}>
                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" placeholder="Text input" />
                    </div>
                </div>


                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-danger" type="email" placeholder="Email input" value="hello@" />
                        <span className="icon is-small is-left">
      <i className="fas fa-envelope"></i>
    </span>
                        <span className="icon is-small is-right">
      <i className="fas fa-exclamation-triangle"></i>
    </span>
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                </div>



                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input type="checkbox" />
                            I agree to the <a href="#">terms and conditions</a>
                        </label>
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                        <button className="button is-link is-light">Cancel</button>
                    </div>
                </div>

            </div>

        )
    }else{
        return(
            <Redirect to="/" />
        )
    }
}

const connectedSignup = connect(
    mapStateToProps,
    mapDispatchToProps
)(Signup);

//<div>
//        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder={'email'}/>
//      <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='password'/>
//    <button onClick={handleSubmit}>Submit</button>
//</div>

export default connectedSignup;