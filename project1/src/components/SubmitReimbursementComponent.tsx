import React from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { submitReimbursement } from '../api/ReimbursementClient';

interface ISubmitReimbursementState{
    amount : string,
    type:string,
    descrip:string
}


export class SubmitReimbursementComponent extends React.Component<any,ISubmitReimbursementState> {

    constructor(props:any){
        super(props);
        this.state = {
            amount : '',
            type: '',
            descrip: '',
        }
    }

    setAmount = (amount: any) => {
        this.setState({
          amount: amount.currentTarget.value,
        })
      }

      setType = (type: any) => {
        this.setState({
          type: type.currentTarget.value,
        })
      }

      setDescrip= (descrip: any) => {
        this.setState({
          descrip: descrip.currentTarget.value,
        })
      }
    
     async submitReimbursementHelper(event:any,amount:string, type:string, descrip:string)
      { 
            event.preventDefault();
            await submitReimbursement(amount,type,descrip);
      }


    render() {
        return(
            <div>
                <h1>Submit Reimbursement</h1>
      <Form onSubmit={(event)=>this.submitReimbursementHelper(event,this.state.amount, this.state.type, this.state.descrip)} autoComplete='off'>
        <FormGroup row>
          <Label for="amount" sm={2}>Amount</Label>
          <Col sm={6}>
            {/* onChange lets Input change state, value lets Input display state */}
            <Input onChange={this.setAmount} value={this.state.amount} type="text" name="amount" id="amount" required />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="type" sm={2}>Type</Label>
          <Col sm={6}>
            <Input onChange={this.setType} value={this.state.type} type="text" name="type" id="type" required />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="descrip" sm={2}>Description</Label>
          <Col sm={6}>
            <Input onChange={this.setDescrip} value={this.state.descrip} type="text" name="descrip" id="descrip" required />
          </Col>
        </FormGroup>
        <Button color="info">Submit</Button>
      </Form>
      </div>
        )
    }
}