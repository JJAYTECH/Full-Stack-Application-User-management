<<<<<<< HEAD
// admin/requests/requests.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RequestsRoutingModule } from './requests-routing.module';
import { ListComponent } from './list.component';
import { ViewComponent } from './view.component';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { ListComponent } from './list.component';
>>>>>>> frontend-backend_CANETE
import { AddEditComponent } from './add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
<<<<<<< HEAD
        RouterModule,
=======
>>>>>>> frontend-backend_CANETE
        RequestsRoutingModule
    ],
    declarations: [
        ListComponent,
<<<<<<< HEAD
        ViewComponent,
        AddEditComponent
    ]
})
export class RequestsModule { }
=======
        AddEditComponent
    ]
})
export class RequestsModule { } 
>>>>>>> frontend-backend_CANETE
