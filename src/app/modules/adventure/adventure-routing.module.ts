import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { FormDesignerComponent } from './components/form-designer/form-designer.component';

const routes: Routes = [
  { path:'',component:DemoComponent },
  { path:'form-design',component:FormDesignerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdventureRoutingModule { }
