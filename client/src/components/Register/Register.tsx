import * as React from 'react';;
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Register.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import User from '../../model/classes/User';
import { User as IUser } from '../../model/interfaces/User';
import { History } from 'history';

import { environment } from '../../environments/environment';
import { Response } from '../../model/interfaces/Response';
import { HttpStatusCode } from '../../model/enums/HttpStatusCode';

interface State {
  user: User
}

interface Props {
  history: History<any>
}

class Register extends React.Component<Props, State> {

  state: State = {
    user: new User('', '', '', '')
  }

  handleChange = (key: string, value: string) => {

    var temp: User = Object.assign({}, this.state.user);

    switch (key) {
      case 'fname':
        temp.fname = value;
        break;
      case 'lname':
        temp.lname = value;
        break;
      case 'email':
        temp.email = value;
        break;
      case 'password':
        temp.password = value;
        break;
    }
    this.setState({
      user: temp
    });
  }

  handleSubmit() {
    if (!this.formComplete()) {
      console.log(this.refs);
    } else {
      if(this.state.user.fname == '') {

      }
      if (this.state.user.lname == '') {

      }
      if (this.state.user.email == '') {
      }
      if (this.state.user.password == '') {

      }
    }
    // fetch(`${environment.API}/users/signup`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     "id": 0,
    //     "firstName": this.state.user.fname,
    //     "lastName": this.state.user.lname,
    //     "email": this.state.user.email,
    //     "password": this.state.user.password
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then((response: Response<IUser>) => {
    //     if (response.statusCode == HttpStatusCode.CREATED) {
    //       this.props.history.push('/login');
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
  }

  handleKeyPress = (event: any) => {
    if(event.key == 'Enter') {
      this.handleSubmit();
    }
  }

  formComplete = () => {
    if(this.state.user.fname == '' || this.state.user.email == '' || this.state.user.lname == '' || this.state.user.password == '') {
      return false;
    }
    
    return true;
  }

  render() {
    return (
      <div className="parent">
        <MuiThemeProvider>
          <div>
            <TextField
              style={style}
              placeholder="First Name"
              name="firstName"
              ref="firstName"
              onChange={(event, newValue) => this.handleChange('fname', newValue)}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <TextField
              style={style}
              name="lastName"
              ref="lastName"
              placeholder="Last Name"
              onChange={(event, newValue) => this.handleChange('lname', newValue)}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <TextField
              style={style}
              name="email"
              ref="email"
              type="Email"
              placeholder="Email"
              onChange={(event, newValue) => this.handleChange('email', newValue)}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <TextField
              style={style}
              name="password"
              ref="password"
              type="Password"
              placeholder="Password"
              onChange={(event, newValue) => this.handleChange('password', newValue)}
              onKeyPress={this.handleKeyPress}
            />
            <br />
            <RaisedButton label="Submit" backgroundColor='#72baea' labelColor='#ffffff' onClick={(event) => this.handleSubmit()} />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15
};
export default Register;