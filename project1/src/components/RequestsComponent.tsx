import React from 'react';
import {ReimbursementTableComponent,ReimbursementRows} from './ViewReimbursementsComponent'
import { ApproveOrDenyComponent } from './ApproveOrDeny';
import {GetAllUsersComponent} from './GetAllUsersComponent'
import { ReimbursementByEmployeeComponent} from './ReimbursementsByEmployee'



export class RequestsComponent extends React.Component<any,any>{



    render(){
        return(
            <>
                {/* <ReimbursementTableComponent status='1' isResolver={false} byUser = {false} userid={1} /> */}
                
                {/* <ReimbursementTableComponent status='0' isResolver={true} byUser = {false} userid={1} /> */}
                
                <ReimbursementByEmployeeComponent/>
                
                
            </>
        )
    }
}