import React from 'react';

import './App.css';
import { LoginComponent } from './components/LoginComponent';
import {NavbarComponent, ReduxNavBarComponent} from './components/NavBarComponent'
import {ReduxLoginComponent} from './components/LoginComponent'
import {BrowserRouter as Router} from 'react-router-dom'
import {Route, Switch, useHistory} from 'react-router';
import {User} from './models/User'
import { connect, Provider } from 'react-redux';
//import {store} from './redux/store';
import { ReduxUserInfoComponent } from './components/UserInfoComponent';
import { SubmitReimbursementComponent } from './components/SubmitReimbursementComponent';
import { ViewReimbursementComponent } from './components/ViewReimbursementsComponent';
import history from './history';
import { PersistGate } from 'redux-persist/integration/react'
import {persistor, store} from './redux/store';

interface IAppState {
  loggedInUser : User | null;
}

export class App extends React.Component<any, IAppState>{


  // updateUser = (user:User) => {
  //   this.setState({
  //     loggedInUser : user,
  //   })
  // }

  constructor(props:any){
    super(props);
    this.state = {
      loggedInUser:null
      
    }
  }
  
  

  render(){
    {console.log(persistor)}
      return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
        <Router>
          
          
                <ReduxNavBarComponent />
                
         
        
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
              
              <Route path='/'>
                  <ReduxLoginComponent history={history}/>

              </Route>
          </Switch>
        </Router>
        </PersistGate>
        </Provider>
      )
    
      
  }
  
  
}

export default App;
