import axios, { AxiosResponse } from 'axios';
//import {Book} from '../models/Book';
import {User} from '../models/User';
import { FailedLoginError } from '../errors/LoginError';
import { Reimbursement } from '../models/Reimbursement';

// For project work, take note that axios interprets non-200s response statuses as errors
// This means you can handle auth problems using try-catch

// We can create a client with config for convenience, then call our methods
// on that client instead of an axios directly. This lets up set up configuration
// without repeating ourselves

const libraryClient = axios.create({
    baseURL : 'http://18.216.197.108:3005',
    //if you don't have the following line, your login won't work
    withCredentials: true,
})


//project 0 is running on my EC2 with public ip 18.216.197.108


// export async function getAllBooks() : Promise<Book[]>{
//     const response = await libraryClient.get('/books');
//     console.log('get all books:');
//     console.log(response);
//     return response.data.map((bookObj : any)=>{
//         const {id, title, author, yearPublished} = bookObj;
//         return new Book(id, title, author, yearPublished);
//     });
// }
export async function logoutAxios(): Promise<AxiosResponse<any> | undefined>{
    let response;
    try{
         response =  await libraryClient.patch('/logout');
    }catch(e){
        console.log(e)
    }
    return response;
       
      
}
// export async function getAllReimbursements():Promise<Reimbursement[]>{

//         const response = await libraryClient.get('/reimbursements');
//         return response.data.map((reimbursementObj : Reimbursement)=> {
//             const {reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type} = reimbursementObj;
//             return new Reimbursement(reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type);
//         })
// }
export async function getReimbursementsWithName():Promise<Reimbursement[]>{
    const response =  await libraryClient.get('/reimbursements/resolver');
    return response.data.map((reimbursementObj : Reimbursement)=> {
        const {reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type} = reimbursementObj;
        return new Reimbursement(reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type);
    })
}
export async function updateReimbursement(status:string, id:string){
    try{
        const response = await libraryClient.patch('/reimbursements',{
            reimbursementid : id,
            status : status
        })
    } catch(e) {
        console.log(e);
    }
}
export async function updateUser(userId: any,username: string, firstName:string, lastName:string, email:string) {
    
    try{
       const response = await libraryClient.patch('/users',{
            userid : userId,
            username : username,
            firstname : firstName,
            lastname: lastName,
            email: email
        })
        console.log(response);
    } catch(e){
        console.log(e);
    }
    
}
export async function submitReimbursement(amount : string, type:string, descrip:string) {
   
    try{
       await libraryClient.post('/reimbursements',{
            amount : amount,
            type : type,
            descrip : descrip,
        })
    } catch(e){
        console.log(e);
    }
    
}

export async function getAllUsers() : Promise<User[]>{
    const response =  await libraryClient.get('/users');
    return response.data.map((userObj : User)=> {
        const {userId, username,password, firstName, lastName , email, roleId} = userObj;
        
        return new User(userId, username, password, firstName, lastName, email, roleId);
    })
}


export async function getReimbursementsById(userid:string) : Promise<Reimbursement[]>{
    const response =  await libraryClient.get('/reimbursements/author/userId/'+userid);
    return response.data.map((reimbursementObj : Reimbursement)=> {
        const {reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type} = reimbursementObj;
        return new Reimbursement(reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type);
    })
}
export async function getReimbursements(status:string, byUser:string) : Promise<Reimbursement[]>{
            
            if(byUser==="true"){
                    const response =  await libraryClient.get('/reimbursements/status/'+status+'/user/1');
                    return response.data.map((reimbursementObj : Reimbursement)=> {
                        const {reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type} = reimbursementObj;
                        return new Reimbursement(reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type);
    })
    } else{
        
        const response =  await libraryClient.get('/reimbursements/status/'+status);
    
    return response.data.map((reimbursementObj : Reimbursement)=> {
        const {reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type} = reimbursementObj;
        return new Reimbursement(reimbursementId, author,amount, dateSubmitted,dateResolved, description , resolver, status, type);
    })
    }
    
    
}

export async function getCurrentUser(id:any): Promise<User>{
    const response = await libraryClient.get('/users/' + id);
    const userInfo =  response.data.map((userObj : User)=> {
        const {userId, username,password, firstName, lastName , email, roleId} = userObj;
        
        return new User(userId, username, password, firstName, lastName, email, roleId);
    });
    const userInfoToSend = userInfo[0];
    return userInfoToSend;
}

export async function login(un:string, pw:string){
    try{
        const response =  await libraryClient.post('/login', {username:un, password: pw});
        const {userId, username,password, firstName, lastName , email, roleId} = response.data;
        console.log(response.data);
        return new User(userId, username, password, firstName, lastName, email, roleId);
    } catch (e){
        if(e.response.status === 401){
            throw new FailedLoginError('Failed to authenticate', un);
        } else{
            //We could throw a different custom error, this exposes a little too much to the user
            throw e;
        }
    }
   
}