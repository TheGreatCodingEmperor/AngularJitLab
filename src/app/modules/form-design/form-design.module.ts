import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDesignBlockDirective } from './directives/form-design-block.directive';



@NgModule({
  declarations: [
    FormDesignBlockDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FormDesignBlockDirective
  ]
})
export class FormDesignModule { }
