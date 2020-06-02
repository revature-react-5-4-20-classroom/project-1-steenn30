import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Button} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import { IState } from '../redux/reducers';
import {logoutClickActionMapper} from '../redux/action-mapper'
import { connect } from 'react-redux';
import {User} from '../models/User'
import {logoutAxios} from '../api/ReimbursementClient';

interface ILogoutComponentProps {
    logoutClickActionMapper:(user:User)=> void;
}

interface ILogoutComponentState {
    userId: number | undefined;
    username: string;
    password: string;
    firstName : string;
    lastName : string;
    email: string;
    roleId: number | undefined;
    
  }
export class NavbarComponent extends React.Component<ILogoutComponentProps,ILogoutComponentState>{
    constructor(props: ILogoutComponentProps) {
        super(props);
        this.state = {
          userId : 0,
          username: '',
          password: '',
          firstName: '',
          lastName: '',
          email: '',
          roleId: 0,
        }
      }
     logout = async (event:any)=>{
            event.preventDefault();
            console.log('logout started');
            const loggedInUser : User = new User(0,'','','','','',0);
            console.log(loggedInUser);
           
            
            this.props.logoutClickActionMapper(loggedInUser);
           await logoutAxios();
    }
    
    render(){
        return (
            <div>
                {/* Just writing the name of a prop is shorthand for prop={true} */}
                <Navbar color="light" light expand="md">
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/profile">My Profile</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/submitreimbursement">New Reimbursement</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/viewreimbursements">View Reimbursements</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button onClick={(event)=>this.logout(event)} id="logout">Logout</Button>
                        </NavItem>
                        
                    </Nav>
                </Navbar>
            </div>
        )
    }
    
}

const mapStateToProps = (state:IState) =>{
    return{
      ...state.user,
    }
}

const mapDispatchToProps = {
    logoutClickActionMapper,
}
   


export const ReduxNavBarComponent = connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);