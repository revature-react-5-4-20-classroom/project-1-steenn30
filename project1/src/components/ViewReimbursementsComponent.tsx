import React from 'react'
import {Reimbursement} from '../models/Reimbursement'
import {getReimbursements} from '../api/ReimbursementClient'
import { IState } from '../redux/reducers';
import { User } from '../models/User';
import {loginClickActionMapper} from '../redux/action-mapper'


interface IReimbursementTableProps{
    status : string;
}

interface IReimbursementState{
    reimbursements : Reimbursement[];
}

export class ReimbursementRows extends React.Component<IReimbursementTableProps, IReimbursementState>{
    constructor(props: IReimbursementTableProps){
        super(props);
        this.state = {
            reimbursements : []
        }
        
    }

    //const reimbursements: Reimbursement[] = await getReimbursements(this.props.status);
    
    // async componentDidMount(){
    //     const status = this.props.status
    //     const reimbursements = await getReimbursements(status);
        
    //     this.setState({
    //            reimbursements : reimbursements
    //     })
        
    // }

    async componentDidMount() {
        //This runs after the component has added an element to the actual DOM for the first time
        // In other words, this runs once the component is done being created
        
        this.setState({
            reimbursements: await getReimbursements(this.props.status)
        });
        
    }
    // Lets us explicitly compare new state and new props to the ucrrent state and props
    // Then decide if we need to update or not.abs
    // We can use this to make our app more efficient and fix update-?setState->update Loops

    // shouldComponentUpdate(nextProps : any, nextState : any){
        
        
    //     return this.state.reimbursements !== nextState.reimbursements;
    // }

    // async componentDidUpdate() {
    //     this.setState({
    //         reimbursements: await getReimbursements(this.props.status)
    //     });
    // }

    render(){
        return( 
            <>
             {this.state.reimbursements.map((row : Reimbursement, i:any) => {
                return <tr key={i}>
                            <td>{row.reimbursementId}</td>
                            <td>{row.author}</td>
                            <td>{row.amount}</td>
                            <td>{row.dateSubmitted}</td>
                            <td>{row.dateResolved}</td>
                            <td>{row.description}</td>
                            <td>{row.status}</td>
                            <td>{row.type}</td>
                    </tr>;
            })}
            </>
        );
    }
}
export class ReimbursementTableComponent extends React.Component<IReimbursementTableProps,any>{
       
    constructor(props: IReimbursementTableProps){
        super(props);
    }
    
    render(){
           return(
               <table>
                   <thead>
                   <tr>
                        <th>ReimbursementId</th>
                        <th>Author</th>
                        <th>Amount</th>
                        <th>Date Submitted</th>
                        <th>Date Resolved</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Type</th>
                   </tr>
                   </thead>
                   <tbody>
                   
                   <ReimbursementRows status={this.props.status}/>
                   </tbody>
               </table>
           )
       }
}



export class ViewReimbursementComponent extends React.Component<any, any>{

    render(){
        return(
            <div>
                <h1>Pending Reimbursements</h1>
                        <ReimbursementTableComponent status='1'/>
                        <br>
                        </br>
                        <br></br>
                        <br>
                        </br>
                        <br></br>
                        <br>
                        </br>
                        <br></br>
                        <br>
                        </br>
                        <br></br>
                        <br>
                        </br>
                        <br></br>

                <h1>Approved Reimbursements</h1>
                    <ReimbursementTableComponent status='2'/>
            </div>
        )
    }    
}
