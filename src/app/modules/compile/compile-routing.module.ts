import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompileHomeComponent } from './components/compile-home/compile-home.component';

const routes: Routes = [
  {path:'',component:CompileHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompileRoutingModule { }
