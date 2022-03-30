import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompileRoutingModule } from './compile-routing.module';
import { CompileHomeComponent } from './components/compile-home/compile-home.component';


@NgModule({
  declarations: [
    CompileHomeComponent
  ],
  imports: [
    CommonModule,
    CompileRoutingModule
  ]
})
export class CompileModule { }
