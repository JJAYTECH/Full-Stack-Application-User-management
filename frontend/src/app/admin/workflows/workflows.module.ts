<<<<<<< HEAD
// admin/workflows/workflows.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { ListComponent } from './list.component';
import { OnboardingComponent } from './onboarding.component';
import { ViewComponent } from './view.component';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { WorkflowsRoutingModule } from './workflows-routing.module';
import { ListComponent } from './list.component';
>>>>>>> frontend-backend_CANETE

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
<<<<<<< HEAD
        RouterModule,
        WorkflowsRoutingModule
    ],
    declarations: [
        ListComponent,
        OnboardingComponent,
        ViewComponent
    ]
})
export class WorkflowsModule { }
=======
        WorkflowsRoutingModule
    ],
    declarations: [
        ListComponent
    ]
})
export class WorkflowsModule { } 
>>>>>>> frontend-backend_CANETE
