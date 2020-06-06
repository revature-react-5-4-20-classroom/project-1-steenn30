import React from 'react';
import {Navbar, NavbarBrand, Nav, NavItem, Button} from 'reactstrap';
import {NavLink, Redirect} from 'react-router-dom';
import {Component} from 'react';
import ReactDOM from 'react-dom';
import { IState } from '../redux/reducers';
import {logoutClickActionMapper} from '../redux/action-mapper'
import { connect } from 'react-redux';
import {User} from '../models/User'
import {logoutAxios, updateUser} from '../api/ReimbursementClient';
import { userInfo } from 'os';

interface ILogoutComponentProps {
    logoutClickActionMapper:(user:User)=> void;
    updateUser : (user:User | null) => void;
}

interface ILogoutComponentState {
    userId: number | undefined;
    username: string;
    password: string;
    firstName : string;
    lastName : string;
    email: string;
    roleId: number | undefined;
    toLogin: boolean;
    
  }
export class ManagerNavbarComponent extends React.Component<ILogoutComponentProps,ILogoutComponentState>{
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
          toLogin:false,
        }
      }
     logout = async (event:any)=>{
            event.preventDefault();
            console.log('logout started');
            const loggedInUser : User = new User(0,'','','','','',0);
            console.log(loggedInUser);
           
            
            this.props.logoutClickActionMapper(loggedInUser);
            await logoutAxios();
            this.props.updateUser(null);
            this.setState({toLogin:true});
    }
    
    render(){

        if(this.state.toLogin){
            this.setState({toLogin:false})
            return(<Redirect to="/"></Redirect>)
            
        } else{
            return (
                <div>
                    {/* Just writing the name of a prop is shorthand for prop={true} */}
                    <Navbar color="light" light expand="md">
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink to="/manager/home">Home</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink to="/manager/requests">Requests</NavLink>
                            </NavItem> */}
                            {/* <NavItem>
                                <NavLink to="/manager/approve_or_deny">Resolve Reimbursements</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink to="/manager/pending_reimbursements">Pending Reimbursements</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manager/resolved_reimbursements">Resolved Reimbursements</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manager/view_employees">Employees</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/manager/reimbursements_by_employee">Reimbursements By Employee</NavLink>
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
    
}

const mapStateToProps = (state:IState) =>{
    return{
      ...state.user,
    }
}

const mapDispatchToProps = {
    logoutClickActionMapper,
}
   


export const ReduxManagerNavBarComponent = connect(mapStateToProps, mapDispatchToProps)(ManagerNavbarComponent);