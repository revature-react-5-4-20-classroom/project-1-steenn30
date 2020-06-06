import React from 'react'
import {Reimbursement} from '../models/Reimbursement'
import {getReimbursements, getReimbursementsWithName} from '../api/ReimbursementClient'
import { IState } from '../redux/reducers';
import { User } from '../models/User';
import {loginClickActionMapper} from '../redux/action-mapper'

interface IReimbursementTableProps{
    status : string;
    isResolver : boolean;
    byUser: string;
    updateTable: boolean;
}
interface IReimbursementState{
    reimbursements : Reimbursement[];
    reimbursementRows:JSX.Element[];
}

export class ReimbursementRows extends React.PureComponent<IReimbursementTableProps, IReimbursementState>{
    constructor(props: IReimbursementTableProps){
        super(props);
        
       
        this.state = {
            reimbursements : [],
            reimbursementRows: []
        }
    }
    async componentDidMount() {
        //This runs after the component has added an element to the actual DOM for the first time
        // In other words, this runs once the component is done being created
        console.log('component mounted');
        if(!this.props.isResolver){
            if(this.props.byUser === "true"){
                this.setState({
                    reimbursements: await getReimbursements(this.props.status, this.props.byUser)
                });
            } else{
               
                this.setState({
                    reimbursements: await getReimbursements(this.props.status, this.props.byUser)
                });
            }
        } else {
            this.setState({
                reimbursements: await getReimbursementsWithName()
            });    
        }  
    }
    
    async componentDidUpdate() {
        //This runs after the component has added an element to the actual DOM for the first time
        // In other words, this runs once the component is done being created
        console.log('component mounted');
        if(this.props.updateTable === true){
            if(!this.props.isResolver){
                if(this.props.byUser === "true"){
                    this.setState({
                        reimbursements: await getReimbursements(this.props.status, this.props.byUser)
                    });
                } else{
                   
                    this.setState({
                        reimbursements: await getReimbursements(this.props.status, this.props.byUser)
                    });
                }
            } else {
                this.setState({
                    reimbursements: await getReimbursementsWithName()
                });    
            } 
        }
    }

    
   
     render(){
        
        return( 
            <tbody>
             {this.state.reimbursements.map((row : Reimbursement, i) => {
                return (<tr key={i}>
                    {Object.values(row).map((value:any, index:number) => {
                        return <td key={index}>{value}</td>
                    })}
                            {/* <td>{row.reimbursementId}</td>
                            <td>{row.author}</td>
                            <td>{row.amount}</td>
                            <td>{row.dateSubmitted}</td>
                            <td>{row.dateResolved}</td>
                            <td>{row.description}</td>
                            <td>{row.resolver}</td>
                            <td>{row.status}</td>
                            <td>{row.type}</td> */}
                    </tr>)
            })}
            </tbody>
            
        );
    }
    
}
interface ITableState{
    reload : boolean;
}

export class ReimbursementTableComponent extends React.PureComponent<IReimbursementTableProps,any>{
       
    constructor(props: IReimbursementTableProps){
        super(props);
     
    }

    // shouldComponentUpdate(nextProps : any, nextState : any){
    //     return false;
    
    // }
    
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
                        <th>Resolver</th>
                        <th>Status</th>
                        <th>Type</th>
                   </tr>
                   </thead>
                   
                   
                   {/* <ReimbursementRows status={this.props.status} isResolver={this.props.isResolver} byUser={this.props.byUser} userid={this.props.userid}/> */}
                   <ReimbursementRows {...this.props}/>
                   
               </table>
           )
       }
}

interface IViewReimbursementComponentProps{
    
}

export class ViewReimbursementComponent extends React.PureComponent<IViewReimbursementComponentProps, any>{
    constructor(props:IViewReimbursementComponentProps){
        super(props)
    }
    async componentShouldUpdate(nextProps : any, nextState : any){
        return false;
    
    }
    render(){
        return(
            <div>
                <h1>Pending Reimbursements</h1>
                        <ReimbursementTableComponent status='1' isResolver={false} byUser="true" updateTable={false}/>
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
                    <ReimbursementTableComponent status='2' isResolver={false} byUser="true" updateTable={false} />

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


            </div>
        )
    }    
}
