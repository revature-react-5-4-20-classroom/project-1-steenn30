import {AnyAction, combineReducers, bindActionCreators} from 'redux';
import { loginTypes } from './action-mapper';
import {User} from '../models/User'




export interface IUserState {
    userId : number;
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;
    roleId : number ;

}

const initialUserState : IUserState = {
    userId : 0,
    username : '',
    password: '',
    firstName : '',
    lastName : '',
    email : '',
    roleId :0
    
}

export const loginReducer = (state:IUserState = initialUserState, action: AnyAction) : IUserState =>{

    switch(action.type){
            case loginTypes.LOGIN_CLICK :{
                let userIdNew = action.payload.loggedInUser.userId;
                console.log(userIdNew);
                let usernameNew = action.payload.loggedInUser.username;
                let passwordNew = action.payload.loggedInUser.password;
                let firstNameNew = action.payload.loggedInUser.firstName;
                let lastNameNew = action.payload.loggedInUser.lastName;
                let emailNew = action.payload.loggedInUser.email;
                let roleIdNew = action.payload.loggedInUser.roleId;

                return{
                    roleId : roleIdNew,
                    userId : userIdNew,
                    username : usernameNew,
                    password: passwordNew,
                    firstName : firstNameNew,
                    lastName : lastNameNew,
                    email : emailNew,
                }
            }
            case loginTypes.LOGOUT_CLICK : {
                    return{
                        userId:initialUserState.userId,
                        username:initialUserState.username,
                        password: initialUserState.password,
                        firstName : initialUserState.firstName,
                        lastName: initialUserState.lastName,
                        email: initialUserState.email,
                        roleId: initialUserState.roleId
                    }
            }
            default : {
                return state;
            }
    }

}




export interface IState {
    user: IUserState,
    
}
// Now all of our reducers are in state, exported here
//all actions can take place on state and they go to the appropriate
// reducer
export const state = combineReducers<IState>({
    user : loginReducer,
})