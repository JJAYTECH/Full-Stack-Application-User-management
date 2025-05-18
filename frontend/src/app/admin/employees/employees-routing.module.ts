<<<<<<< HEAD
// admin/employees/employees-routing.module.ts
=======
>>>>>>> frontend-backend_CANETE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { TransferComponent } from './transfer.component';
<<<<<<< HEAD
=======
import { WorkflowsComponent } from './workflows.component';
import { RequestsComponent } from './requests.component';
>>>>>>> frontend-backend_CANETE

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
<<<<<<< HEAD
    { path: 'transfer/:id', component: TransferComponent }
=======
    { path: 'transfer/:id', component: TransferComponent },
    { path: 'workflows/:id', component: WorkflowsComponent },
    { path: 'requests/:id', component: RequestsComponent }
>>>>>>> frontend-backend_CANETE
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
<<<<<<< HEAD
export class EmployeesRoutingModule { }
=======
export class EmployeesRoutingModule { } 
>>>>>>> frontend-backend_CANETE
