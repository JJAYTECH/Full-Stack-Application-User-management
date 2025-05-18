<<<<<<< HEAD
// admin/employees/employees.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
>>>>>>> frontend-backend_CANETE

import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { TransferComponent } from './transfer.component';
<<<<<<< HEAD
=======
import { WorkflowsComponent } from './workflows.component';
import { RequestsComponent } from './requests.component';
>>>>>>> frontend-backend_CANETE

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
<<<<<<< HEAD
        RouterModule,
=======
>>>>>>> frontend-backend_CANETE
        EmployeesRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent,
<<<<<<< HEAD
        TransferComponent
    ]
})
export class EmployeesModule { }
=======
        TransferComponent,
        WorkflowsComponent,
        RequestsComponent
    ]
})
export class EmployeesModule { } 
>>>>>>> frontend-backend_CANETE
