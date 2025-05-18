<<<<<<< HEAD
// admin/accounts.module

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
>>>>>>> frontend-backend_CANETE
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
<<<<<<< HEAD
        AccountsRoutingModule
    ],
    declarations: [
=======
        RouterModule.forChild([
            {
                path: '', component: LayoutComponent,
                children: [
                    { path: '', component: ListComponent },
                    { path: 'add', component: AddEditComponent },
                    { path: 'edit/:id', component: AddEditComponent }
                ]
            }
        ])
    ],
    declarations: [
        LayoutComponent,
>>>>>>> frontend-backend_CANETE
        ListComponent,
        AddEditComponent
    ]
})
<<<<<<< HEAD
export class AccountsModule { }
=======
export class AccountsModule { } 
>>>>>>> frontend-backend_CANETE
