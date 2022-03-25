import { CommonModule } from '@angular/common';
import { Component, ModuleWithProviders, OnInit, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    </div>
    <div dg-adhoc-html [dg-adhoc-html]="html" [dg-adhoc-context]="data" [dg-adhoc-imports]="modules" [script]="script"></div>
  `,
  styles: [
  ]
})
export class DemoComponent implements OnInit {
  script = `console.log('hello world!!!')`;
  modules: Array<Type<SafeAny> | ModuleWithProviders<SafeAny> | SafeAny[]> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
  title = 'dynamic-template';
  html = `
<t trigger (trigger)="setValue('abc',789)"></t>
{{ context.abc | json }}

<input id="abc" [(ngModel)]="context.abc" (change)="context.show()" />

<p-dialog header="Title" [(visible)]="context.display">
    Content
</p-dialog>

<button type="button" pButton  (click)="context.display = ! context.display" icon="pi pi-info-circle" label="Show"></button>

<p-table [value]="[{'code':123,'name':123,'category':123,'quantity':123}]" responsiveLayout="scroll">
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
`

  test = eval(`(class Test{
    value= 123;
    show= () => {
      alert("show")
    };
    toggle = function(){
      this.display = ! this.display;
    }
    display=false;
  })`);
  data = new this.test();

  constructor() { }

  ngOnInit(): void {
  }
}
