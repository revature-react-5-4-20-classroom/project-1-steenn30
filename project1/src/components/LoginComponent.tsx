import React from 'react';
import { User } from '../models/User';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { login } from '../api/ReimbursementClient';
import {loginClickActionMapper} from '../redux/action-mapper'
import { IState } from '../redux/reducers';
import { connect, Provider } from 'react-redux';
import {Redirect } from 'react-router-dom';
import  store  from '../App';
import history from '../history'

//the updateUser prop takes a function that takes a user and returns voide
// it will match updateUser in App.
interface ILoginComponentProps {
  //updateUser: (user:User) => void;
  loginClickActionMapper:(user:User)=> void;
  history : any;
  userId : number;
  username : string;
  password : string;
  firstName : string;
  lastName : string;
  email : string;
  roleId : number;
  updateUser : (user:User) => void;
}

interface ILoginComponentState {
  userId: number;
  username: string;
  password: string;
  firstName : string;
  lastName : string;
  email: string;
  roleId: number;
  isError: boolean;
  errorMessage: string;
  redirect:boolean;
  
}
export interface IUserState {
  userId : number;
  username : string;
  password : string;
  firstName : string;
  lastName : string;
  email : string;
  roleId : number;

}

export class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {

  constructor(props: ILoginComponentProps) {
    super(props);
    this.state = {
      userId : 0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      roleId: 0,
      isError: false,
      errorMessage: '',
      redirect: false
    }
  }

  //We'll need a few functions to modify individual pieces of our state
  // These take change events
  // Set username and set password are for the onChange event
  setUsername = (un: any) => {
    this.setState({
      username: un.currentTarget.value,
    })
  }

  setPassword = (pw: any) => {
    this.setState({
      password: pw.currentTarget.value,
    })
  }

  clearError = () => {
    this.setState({
      errorMessage: '',
      isError: false,
    })
  }

  attemptLogin = async (event: any) => {
    event.preventDefault();
    console.log(event);
    
    try {
          console.log(this.state.username);
          const loggedInUser  = await login(this.state.username, this.state.password);
          console.log(loggedInUser);
          this.props.loginClickActionMapper(loggedInUser);
          console.log(this);
          this.props.updateUser(loggedInUser);
          this.setState({
            redirect:true
          })
    } catch (error) {
        this.setState({
          password: '',
          isError: true,
          errorMessage: error.message,
        })
    }
  }

  render() {
    if(this.state.redirect){
      this.setState({
        redirect:false
      })
      return(
        <Redirect to='/home'></Redirect>
      )
    }else{
      return (
        <div>
        <Form onSubmit={this.attemptLogin} autoComplete='off'>
          <FormGroup row>
            <Label for="username" sm={2}>Username</Label>
            <Col sm={6}>
              {/* onChange lets Input change state, value lets Input display state */}
              <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username" placeholder="your username" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="password" sm={2}>Password</Label>
            <Col sm={6}>
              <Input onChange={this.setPassword} value={this.state.password} type="password" name="password" id="password" required />
            </Col>
          </FormGroup>
          <Button color="info">Submit</Button>
        </Form>
        <Toast isOpen={this.state.isError}>
          <ToastHeader icon="danger" toggle={this.clearError}>
            Error!
          </ToastHeader>
          <ToastBody>
            {this.state.errorMessage}
          </ToastBody>
  
        </Toast>
        </div>
      );
    }
    
    
  }

}


const mapStateToProps = (state:IState) =>{
  return{
    ...state.user,
  }
}
const mapDispatchToProps = {
  loginClickActionMapper,
 
}

// finally, we set up the componenet in its container with its connections
// connect produces a "higher order component" that takes a component as an argument and returns a component
// higher order components are just like higher order functions(takes functions returns another function);
// connect sets up a container component of ReduxGame
// this is what causes the props to be passed to this component
export const ReduxLoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);

