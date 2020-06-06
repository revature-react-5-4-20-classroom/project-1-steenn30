import React from 'react';
import {getAllUsers} from '../api/ReimbursementClient'
import {User} from '../models/User'



interface IUserState{
    users : User[];
}

export class EmployeesRows extends React.Component<any, IUserState>{
    constructor(props: IUserState){
        super(props);
        this.state = {
            users : []
        }
    }


    async componentDidMount() {
        //This runs after the component has added an element to the actual DOM for the first time
        // In other words, this runs once the component is done being created

        
        this.setState({
            users: await getAllUsers()
        });
        
        
    }

    render(){
        
        return( 
            <>
             {this.state.users.map((row : User, i:any) => {
                return <tr key={i}>
                            <td>{row.userId}</td>
                            <td>{row.username}</td>
                            <td>{row.firstName}</td>
                            <td>{row.lastName}</td>
                            <td>{row.email}</td>
                            <td>{row.roleId}</td>
                    </tr>;
            })}
            </>
        );
    }
}
export class EmployeesTableComponent extends React.Component<any,any>{
       
    constructor(props: any){
        super(props);
    }
    
    render(){
           return(
               <table>
                   <thead>
                   <tr>
                        <th>User Id</th>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role Id</th>
                   </tr>
                   </thead>
                   <tbody>
                   
                   <EmployeesRows />
                   </tbody>
               </table>
           )
       }
}
export class GetAllUsersComponent extends React.Component{


    render(){
        return(
            <EmployeesTableComponent />
        )
    }
}