import React from 'react'
import {Reimbursement} from '../models/Reimbursement'
import {getReimbursements, getReimbursementsWithName} from '../api/ReimbursementClient'
import { IState } from '../redux/reducers';
import { User } from '../models/User';
import {loginClickActionMapper} from '../redux/action-mapper'
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import {getReimbursementsById} from '../api/ReimbursementClient'


interface IReimbursementTableProps{
    userid:string
    reimbursements: Reimbursement[];
}

interface IReimbursementState{
    reimbursements : Reimbursement[];
}

export class ReimbursementRows extends React.PureComponent<IReimbursementTableProps, IReimbursementState>{
    constructor(props: IReimbursementTableProps){
        super(props);
        // this.state = {
        //     reimbursements : []
        // }
    }

    
   

   

//     async componentDidMount() {
//         this.setState({
//            reimbursements: await getReimbursementsById(this.props.userid)
//        });
//    }


    render(){
        
        return( 
            <>
            <tbody>
             {this.props.reimbursements.map((row : Reimbursement, i) => {
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
                        <th>Resolver</th>
                        <th>Status</th>
                        <th>Type</th>
                   </tr>
                   </thead>
                   
                   <ReimbursementRows userid={this.props.userid} reimbursements={this.props.reimbursements}/>
                   
               </table>
           )
       }
}

interface IWholeState{
    userid : string,
    reimbursements: Reimbursement[]
}

export class ReimbursementByEmployeeComponent extends React.Component<any, IWholeState>{
    constructor(props:IReimbursementTableProps){
        super(props);
        this.state = {
            userid : '0',
            reimbursements: []
        }
    }
    async updateReimbursements(){
        console.log(this.state.userid)
        this.setState({
            reimbursements: await getReimbursementsById(this.state.userid),
        });
    }
    sleep = (milliseconds : any) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    setUserid =(id: any) => {
        this.setState({
            userid: id.currentTarget.value,
          }) 
        this.sleep(50).then(() => {
            this.updateReimbursements();
          })
        
    }
    render(){
        return(
            <div>
                <ReimbursementTableComponent userid={this.state.userid} reimbursements={this.state.reimbursements} />

        <Form  autoComplete='off'>
          <FormGroup row>
            <Label for="userid" sm={2}>User Id</Label>
            <Col sm={6}>
              {/* onChange lets Input change state, value lets Input display state */}
              <Input onChange={this.setUserid} value={this.state.userid} type="text" name="userid" id="userid" />
            </Col>
          </FormGroup>
         
          {/* <Button color="info">Submit</Button> */}
        </Form>
            </div>
        )
    }    
}
