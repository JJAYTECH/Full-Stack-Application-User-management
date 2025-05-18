<<<<<<< HEAD
// admin/requests/requests-routing.module.ts
=======
>>>>>>> frontend-backend_CANETE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
<<<<<<< HEAD
import { ViewComponent } from './view.component';
=======
>>>>>>> frontend-backend_CANETE
import { AddEditComponent } from './add-edit.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
<<<<<<< HEAD
    { path: ':id/edit', component: AddEditComponent },
    { path: ':id', component: ViewComponent }
=======
    { path: 'edit/:id', component: AddEditComponent }
>>>>>>> frontend-backend_CANETE
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
<<<<<<< HEAD
export class RequestsRoutingModule { }
=======
export class RequestsRoutingModule { } 
>>>>>>> frontend-backend_CANETE
