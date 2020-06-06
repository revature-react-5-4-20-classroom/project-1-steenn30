import React from 'react';
import { Form, FormGroup, Label, Col, Input, Button, Toast, ToastHeader, ToastBody } from 'reactstrap';
import { updateReimbursement } from '../api/ReimbursementClient';
import { ReimbursementTableComponent } from './ViewReimbursementsComponent';

interface IApproveOrDenyState {
    status:string;
    id : string;
    updateTable: boolean
}

export class ApproveOrDenyComponent extends React.Component<any,IApproveOrDenyState>{
    constructor(props:any){
        super(props);
        this.state = {
            status : '1',
            id : '0',
            updateTable: false
        }
    }
    shouldComponentUpdate(){
      return true;
    }
    approveOrDeny = async (event: any) => {
        event.preventDefault();
        await updateReimbursement(this.state.status,this.state.id);
        this.setState({
          updateTable: !this.state.updateTable
        })
        this.forceUpdate()
        this.setState({
          updateTable: !this.state.updateTable
        })
        
    }

    setStatus = (s: any) => {
        this.setState({
          status: s.currentTarget.value,
        })
    }
    setId = (id: any) => {
        this.setState({
          id: id.currentTarget.value,
        })
    }



    render(){
        return(
            <div>
              <ReimbursementTableComponent status='1' isResolver={false} byUser="false" updateTable={this.state.updateTable}  />
        <Form onSubmit={this.approveOrDeny} autoComplete='off'>
          <FormGroup row>
            <Label for="Status" sm={2}>New Status (2 to Approve, 3 to Deny</Label>
            <Col sm={6}>
              {/* onChange lets Input change state, value lets Input display state */}
              <Input onChange={this.setStatus} value={this.state.status} type="text" name="status" id="status" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="id" sm={2}>Enter an ID</Label>
            <Col sm={6}>
              <Input onChange={this.setId} value={this.state.id} type="text" name="id" id="newid" required />
            </Col>
          </FormGroup>
          <Button color="info">Approve or Deny</Button>
        </Form>
            </div>
        )
    }
}