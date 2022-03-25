import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdventureRoutingModule } from './adventure-routing.module';
import { DemoComponent } from './components/demo/demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdventureRoutingModule
  ]
})
export class AdventureModule { }
