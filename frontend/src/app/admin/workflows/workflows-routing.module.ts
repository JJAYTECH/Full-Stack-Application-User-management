<<<<<<< HEAD
// admin/workflows/workflows-routing.module.ts
=======
>>>>>>> frontend-backend_CANETE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list.component';
<<<<<<< HEAD
import { OnboardingComponent } from './onboarding.component';
import { ViewComponent } from './view.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'onboarding', component: OnboardingComponent },
    { path: ':id', component: ViewComponent }
=======

const routes: Routes = [
    { path: '', component: ListComponent }
>>>>>>> frontend-backend_CANETE
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
<<<<<<< HEAD
export class WorkflowsRoutingModule { }
=======
export class WorkflowsRoutingModule { } 
>>>>>>> frontend-backend_CANETE
