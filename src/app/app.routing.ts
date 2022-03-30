import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path:'',component:AppComponent,children:[
    { path:"adventure", loadChildren:()=> import("./modules/adventure/adventure.module").then(m => m.AdventureModule) },
    { path:"compile", loadChildren:()=> import("./modules/compile/compile.module").then(m => m.CompileModule) }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
