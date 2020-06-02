import {User} from '../models/User'

export interface IUserState {
    userId : number;
    username : string;
    password : string;
    firstName : string;
    lastName : string;
    email : string;
    roleId : number;

}

export const loginTypes = {
    LOGIN_CLICK: 'LOGIN_CLICK',
    LOGOUT_CLICK: 'LOGOUT_CLICK',
}


export const loginClickActionMapper = (loggedInUser:IUserState) =>{
    return {
        type: loginTypes.LOGIN_CLICK,
        payload: {
            loggedInUser
        }
    }
}


export const logoutClickActionMapper = (loggedInUser:IUserState) =>{
    return {
        type: loginTypes.LOGOUT_CLICK,
        payload: {
            loggedInUser
        }
    }
}