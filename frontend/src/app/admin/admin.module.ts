<<<<<<< HEAD
// admin/admin.module

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
=======
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout.component';
import { OverViewComponent } from './overview.component';
import { SubNavComponent } from './subnav.component';
>>>>>>> frontend-backend_CANETE

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
<<<<<<< HEAD
    AdminRoutingModule
  ],
  declarations: [
    SubNavComponent,
    LayoutComponent,
    OverviewComponent
  ]
})
export class AdminModule {}
=======
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [
    LayoutComponent,
    OverViewComponent,
    SubNavComponent
  ]
})
export class AdminModule { }
>>>>>>> frontend-backend_CANETE
