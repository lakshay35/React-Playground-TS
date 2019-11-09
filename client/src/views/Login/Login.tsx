import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { setPageTitle } from '../../redux/actions/page';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { History } from 'history';

import { environment } from '../../environments/environment';
import { Response } from '../../model/interfaces/Response';
import { User } from '../../model/interfaces/User';

interface Props {
    history: History<any>,
    setPageTitle: (title: string) => void,
}

interface State {
    username: string,
    password: string,
    loginError: boolean
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setPageTitle: (title: String) => dispatch(setPageTitle(title))
    }
}

class LoginComponent extends  React.Component<Props, State> {


    /**
     * State properties
     */
    state: State = {
        username:'',
        password:'',
        loginError: false
    }

    /**
     * Handles authentication request
     */
    handleClick = () => {

        fetch(`${environment.API}/users/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            })
        })
        .then(response => response.json())
        .then((result: Response<User>) => {
            if (result.statusCode.toLowerCase() == 'ok') {
                sessionStorage.setItem('userId', result.response.id.toString());
                sessionStorage.setItem('loggedin', 'true');
                this.props.setPageTitle('Home');
                this.props.history.push('/home');
            } else {
                this.setState({loginError: true});
            }
        })
        .catch(error => {
            console.error(error);
        })
    }

    render() {
        return (
            <div className="parent">
                <MuiThemeProvider>
                    <div>
                    <TextField
                        name="email"
                        style={style}
                        placeholder="Email"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                    <br/>
                    <TextField
                        style={style}
                        name="password"
                        type="Password"
                        placeholder="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                    />
                    <br/>
                    <RaisedButton className='submitButton' label="Submit" backgroundColor='#72baea' labelColor='#ffffff' style={style} onClick={() => this.handleClick()}/>
                    {this.state.loginError ? <p className="error">Incorrect Username or Password</p>: <p></p>}
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
 margin: 15,
};

const Login = connect(null, mapDispatchToProps)(LoginComponent);

export default Login;