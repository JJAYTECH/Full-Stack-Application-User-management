<<<<<<< HEAD
// admin/departments/departments-routing.module.ts
=======
>>>>>>> frontend-backend_CANETE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
<<<<<<< HEAD
export class DepartmentsRoutingModule { }
=======
export class DepartmentsRoutingModule { } 
>>>>>>> frontend-backend_CANETE
