import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
=======

>>>>>>> frontend-backend_CANETE
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';

const routes: Routes = [
<<<<<<< HEAD
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: DetailsComponent},
            { path: 'update', component: UpdateComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {  }
=======
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: DetailsComponent },
      { path: 'update', component: UpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
>>>>>>> frontend-backend_CANETE
