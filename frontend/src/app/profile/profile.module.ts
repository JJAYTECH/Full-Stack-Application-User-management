import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { LayoutComponent } from './layout.component';
import { DetailsComponent } from './details.component';
import { UpdateComponent } from './update.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule
  ],
  declarations: [
    LayoutComponent,
    DetailsComponent,
    UpdateComponent
  ]
})
<<<<<<< HEAD
export class ProfileModule {}
=======
export class ProfileModule { }
>>>>>>> frontend-backend_CANETE
