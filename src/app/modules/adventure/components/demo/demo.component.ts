import { CommonModule } from '@angular/common';
import { Component, ModuleWithProviders, OnInit, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormDesignModule } from 'src/app/modules/form-design/form-design.module';

type SafeAny = any;

@Component({
  selector: 'app-demo',
  template: `
    <p>
      demo works!
    </p>
    123
    <p-megaMenu [model]="[{'label':'Video 1'}]"></p-megaMenu>
    <div class="flex">
      <textarea [(ngModel)]="html" type="text"></textarea>
      <textarea [(ngModel)]="test" type="text"></textarea>
      <button (click)="save()">Save</button>
    </div>
    <div dg-adhoc-html [dg-adhoc-html]="innerHTML" [dg-adhoc-context]="data" [dg-adhoc-imports]="modules" [script]="script"></div>
  `,
  styles: [
  ]
})
export class DemoComponent implements OnInit {
  script = `console.log('hello world!!!')`;
  modules: Array<Type<SafeAny> | ModuleWithProviders<SafeAny> | SafeAny[]> = [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormDesignModule
  ]
  title = 'dynamic-template';
  html = `
  <div draggable="true">drag</div>
  <div fd-block (dragover)="context.dragover($event)" >123</div>
  <t trigger (trigger)="setValue('abc',789)"></t>
  {{ context.abc | json }}
  
  <input id="abc" [(ngModel)]="context.abc" (change)="context.show()" />
  
  <p-dialog header="Title" [(visible)]="context.display">
      Content
  </p-dialog>
  
  <button type="button" pButton  (click)="context.display = ! context.display" icon="pi pi-info-circle" label="Show"></button>
  
  <p-table [value]="context.datas" responsiveLayout="scroll">
      <ng-template pTemplate="header">
          <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
          </tr>
      </ng-template>
      <ng-template pTemplate="body" let-product>
          <tr>
              <td>{{product.code}}</td>
              <td>{{product.name}}</td>
              <td>{{product.category}}</td>
              <td>{{product.quantity}}</td>
          </tr>
      </ng-template>
  </p-table>
  <button (click)="context.show()">show</button>
  
  {{ setValue('arr',[{'name':123},{'name':124},{'name':125}]) }}
  <div class="p-3">
  <p-card>
  123
  </p-card>
  </div>
  <button (click)="context.api()">Api</button>
  `

  test = `(class Test{
    value= 123;
    show= () => {
      http.get('https://localhost:7152/api/test').subscribe(res => {console.log(res)},err=>{console.log(err)})
      alert("show")
    };
    toggle = function(){
      this.display = ! this.display;
    }
    display=false;
    dragover = function(e){
      e.preventDefault();
    }
  })`;

  innerHTML = '';
  data = {};

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  save(){
    this.innerHTML = this.html;
    let http = this.http;
    let test = eval(this.test)
    this.data = new test();
  }
}
