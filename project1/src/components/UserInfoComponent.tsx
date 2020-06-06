import React from 'react';
import {User} from '../models/User';
import { IState } from '../redux/reducers';

import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { login, updateUser } from '../api/ReimbursementClient';
import {loginClickActionMapper} from '../redux/action-mapper'
import {getCurrentUser} from '../api/ReimbursementClient'

import { connect, Provider } from 'react-redux';

export interface IUserProps {
    userId : number ;
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;
    roleId : number ;
    
}

export interface IUserState {
    userId : number;
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;
    roleId : number ;

}
export class UserInfoComponent extends React.Component<IUserProps, IUserState> {

    constructor(props: IUserProps){
        super(props);
        this.state ={
            userId: this.props.userId,
            username:'',
            password:'',
            firstName:'',
            lastName:'',
            email:'',
            roleId:0
        }
    }
    getCurrentUserHelper = async (id:number) : Promise<User> => {
        
          const userInfo  = await getCurrentUser(id);
          return userInfo;          
    }
    async componentDidMount(){
        
        console.log(this);
        let userId = this.props.userId
        console.log(`store userId is: ${this.props.username}`)
        let currentUser = await this.getCurrentUserHelper(userId);
        console.log(currentUser.userId);
        this.setState({
                userId : currentUser.userId,
                username:currentUser.username,
                firstName:currentUser.firstName,
                lastName: currentUser.lastName,
                email:currentUser.email,
                roleId:currentUser.roleId

        })
    }

    async updateUserHelper(event:any,userId:any,username:string, firstName:string, lastName:string, email:string)
      { 
            event.preventDefault();
            await updateUser(userId,username,firstName,lastName,email);
      }

    setUsername= (username: any) => {
        this.setState({
          username: username.currentTarget.value,
        })
      }
      setFirstName= (firstName: any) => {
        this.setState({
          firstName: firstName.currentTarget.value,
        })
      }
      setLastName= (lastName: any) => {
        this.setState({
          lastName: lastName.currentTarget.value,
        })
      }
      setEmail= (email: any) => {
        this.setState({
          email: email.currentTarget.value,
        })
      }
   render() { 
        //const userId = this.props.userId
        //const currentUser = await this.getCurrentUserHelper(userId);
        return(
            <>
                <h1>Hello {this.state.firstName} {this.state.lastName}</h1>
                <p>UserId: {this.state.userId}</p>
                <p>Username: {this.state.username}</p>
                <p>First Name: {this.state.firstName}</p>
                <p>Last Name: {this.state.lastName}</p>
                <p>Email: {this.state.email}</p>
                <p>Role: {this.state.roleId}</p>
                <br></br>

                <h1>Update Your Info</h1>
                <Form onSubmit={(event)=>this.updateUserHelper(event,this.state.userId,this.state.username, this.state.firstName, this.state.lastName,this.state.email)} autoComplete='off'>
                    <FormGroup row>
                    <Label for="username" sm={2}>Username</Label>
                    <Col sm={6}>
                        <Input onChange={this.setUsername} value={this.state.username} type="text" name="username" id="username"  />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="firstName" sm={2}>First Name</Label>
                    <Col sm={6}>
                        <Input onChange={this.setFirstName} value={this.state.firstName} type="text" name="firstName" id="firstName" />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="lastName" sm={2}>Last Name</Label>
                    <Col sm={6}>
                        <Input onChange={this.setLastName} value={this.state.lastName} type="text" name="lastName" id="lastName" />
                    </Col>
                    </FormGroup>
                    <FormGroup row>
                    <Label for="email" sm={2}>Email</Label>
                    <Col sm={6}>
                        <Input onChange={this.setEmail} value={this.state.email} type="text" name="email" id="email" />
                    </Col>
                    </FormGroup>
                
                <Button color="info">Submit</Button>
            </Form>
                
            </>
        );
        
     
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
   


export const ReduxUserInfoComponent = connect(mapStateToProps, mapDispatchToProps)(UserInfoComponent);