import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsertarRoutingModule } from './insertar-routing.module';
import { InsertarComponent } from './insertar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InsertarComponent],
  imports: [
    CommonModule,
    InsertarRoutingModule,
    ReactiveFormsModule
  ]
})
export class InsertarModule { }
