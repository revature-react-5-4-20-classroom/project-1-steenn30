import React from 'react';
import './App.css';
import { LoginComponent } from './components/LoginComponent';
import {NavbarComponent, ReduxNavBarComponent} from './components/NavBarComponent'
import {ReduxLoginComponent} from './components/LoginComponent'
//import { ConnectedRouter as Router} from "connected-react-router";
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch, useHistory, Redirect} from 'react-router';
import {User} from './models/User'
import { connect, Provider } from 'react-redux';
//import {store} from './redux/store';
import { ReduxUserInfoComponent } from './components/UserInfoComponent';
import { SubmitReimbursementComponent } from './components/SubmitReimbursementComponent';
import { ViewReimbursementComponent, ReimbursementTableComponent } from './components/ViewReimbursementsComponent';
import history from './history';
import { PersistGate } from 'redux-persist/integration/react'
//import {persistor, store} from './redux/store';
import {store} from './redux/store';
import {createBrowserHistory} from 'history';
import { RequestsComponent } from './components/RequestsComponent';
import { ReduxManagerNavBarComponent } from './components/ManagerNavBarComponent';
import { ApproveOrDenyComponent } from './components/ApproveOrDeny';
import { GetAllUsersComponent } from './components/GetAllUsersComponent';
import { ReimbursementByEmployeeComponent } from './components/ReimbursementsByEmployee';

interface IAppState {
  loggedInUser : User | null;
}


export class App extends React.Component<any, IAppState>{


  updateUser = (user:User | null) => {
    this.setState({
      loggedInUser : user,
    })
  }

  constructor(props:any){
    super(props);
    this.state = {
      loggedInUser:null
      
    }
  }
  
  

  render(){
    
    if(this.state.loggedInUser!== null){

      if(this.state.loggedInUser.roleId == 3){
        return(
           
          <Provider store={store}>
              
          <Router>
                   <ReduxNavBarComponent updateUser={this.updateUser} /> 
                   <Redirect to="/home"></Redirect> 
                        
            <Switch>
                <Route path='/profile'>
                          <ReduxUserInfoComponent/>
                </Route>
                <Route path='/submitreimbursement'>
                      <SubmitReimbursementComponent/>
                </Route>
                
                <Route path='/viewreimbursements'>
                      <ViewReimbursementComponent/>
                </Route>
                
            </Switch>
          </Router>
          
          </Provider>
          
        )

      }
      else{
        return(

          <Provider store={store}>
              <Router>
                      <ReduxManagerNavBarComponent updateUser={this.updateUser} />       
                <Switch>
                    <Route path='/profile'>
                              <ReduxUserInfoComponent/>
                    </Route>
                    <Route path='/manager/requests'>
                              <RequestsComponent/>
                    </Route>
                    {/* <Route path='/manager/approve_or_deny'>
                          
                    </Route> */}
                    <Route path='/manager/pending_reimbursements'>
                          {/* <ReimbursementTableComponent status='1' isResolver={false} byUser="false"  /> */}
                          <ApproveOrDenyComponent/>
                    </Route>
                    <Route path='/manager/resolved_reimbursements'>
                          <ReimbursementTableComponent status='0' isResolver={true} byUser="false" updateTable={false}/>
                    </Route>
                    <Route path='/manager/view_employees'>
                          <GetAllUsersComponent />
                    </Route>
                    <Route path='/manager/reimbursements_by_employee'>
                          <ReimbursementByEmployeeComponent/>
                    </Route>
                </Switch>
              </Router>
          </Provider>
        )
      }
      
    } else{ 
            return(
              <Provider store={store}>
              <Router>
                <Switch>
                  <Route path='/'>
                    <ReduxLoginComponent history={history} updateUser={this.updateUser}/>
                  </Route>
              </Switch>
            </Router>
            </Provider>
            )
    }
  }
}

export default App;
