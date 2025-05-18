<<<<<<< HEAD
// admin/departments/departments.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
>>>>>>> frontend-backend_CANETE

import { DepartmentsRoutingModule } from './departments-routing.module';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
<<<<<<< HEAD
import { LayoutComponent } from '../layout.component';
=======
>>>>>>> frontend-backend_CANETE

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
<<<<<<< HEAD
        RouterModule,
=======
>>>>>>> frontend-backend_CANETE
        DepartmentsRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent
    ]
})
<<<<<<< HEAD
export class DepartmentsModule { }
=======
export class DepartmentsModule { } 
>>>>>>> frontend-backend_CANETE
