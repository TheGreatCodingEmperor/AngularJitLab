import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdventureRoutingModule } from './adventure-routing.module';
import { DemoComponent } from './components/demo/demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FormDesignerComponent } from './components/form-designer/form-designer.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DemoComponent,
    FormDesignerComponent
  ],
  imports: [
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdventureRoutingModule
  ]
})
export class AdventureModule { }
