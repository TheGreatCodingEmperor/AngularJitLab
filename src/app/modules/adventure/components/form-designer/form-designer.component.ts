import { CommonModule } from '@angular/common';
import { Component, ModuleWithProviders, OnInit, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDesignModule } from 'src/app/modules/form-design/form-design.module';
import { FormDesignService } from 'src/app/modules/form-design/services/form-design.service';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import * as d3 from 'd3';

type SafeAny = any;

@Component({
  selector: 'app-form-designer',
  template: `
  <textarea [(ngModel)]="html"></textarea>
  <div draggable="true" (dragstart)="dragStart('input')">input</div>
  <div draggable="true" (dragstart)="dragStart('select')">select</div>
  <button (click)="addBlock()"> Add Block </button>
  <div dg-adhoc-html [dg-adhoc-html]="html" [dg-adhoc-context]="data" [dg-adhoc-styles]="styles" [dg-adhoc-imports]="modules" [script]="script"></div>
  `,
  styles: []
})
export class FormDesignerComponent implements OnInit {
  html = `<div id="a1" index="1" fd-block class="fd-block" style="display:flex;">
  <div id="a2" index="1" style="width:50px;" fd-block  class="fd-block"><input id="abc" [(ngModel)]="context.abc" (change)="context.show()" /></div>
  <div id="a3" index="1" style="width:50px;" fd-block  class="fd-block"></div>
  <div id="a4" index="1" style="width:50px;" fd-block  class="fd-block"><p-megaMenu [model]="[{'label':'Video 1'}]"></p-megaMenu></div>
  <div id="a5" index="1" style="width:50px;" fd-block  class="fd-block"></div>
</div>`;
  data = new (class Test {
    dragover = function (e) {
      e.preventDefault();
    }
  });
  styles = [`.fd-block{
    background-color:rgba(50,50,50,0.3);
    margin:.5rem;
    height:50px;
    border:2px solid black;
  }`];

  modules: Array<Type<SafeAny> | ModuleWithProviders<SafeAny> | SafeAny[]> = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormDesignModule
  ]

  constructor(
    private fdService: FormDesignService
  ) { }

  ngOnInit(): void {
    this.fdService.ondrop.subscribe(res => {
      setTimeout(() => {
        var parser = new DOMParser();
        let htmlDoc = parser.parseFromString(this.html, "text/html");
        // start
        let id = this.fdService.startDrag.id;
        if (id) {
          let startElement = d3.select(htmlDoc).select(`#${id}`);
          // startElement.html(this.fdService.endDrag.preHTML);
          startElement.attr('innerText',this.fdService.endDrag.preHTML);
        }

        // end
        id = this.fdService.endDrag.id;
        if (id) {
          let endElement = d3.select(htmlDoc).select(`#${id}`);
          endElement.html(this.fdService.startDrag.preHTML);
          console.log(endElement.node());
        }

        this.html = `${d3.select(htmlDoc).select('body').node().innerHTML}`.replace('[(ngmodel)]','[(ngModel)]');
        console.log(`${d3.select(htmlDoc).select('body').node().innerHTML}`);
      }, 200);
    })
  }

  dragover = function (e) {
    e.preventDefault();
  }

  addBlock() {
    this.html = this.html + `<div fd-block class="fd-block">
      <div style="width:50px;" fd-block class="fd-block"></div>
      <div style="width:50px;" fd-block class="fd-block"></div>
      <div style="width:50px;" fd-block class="fd-block"></div>
      <div style="width:50px;" fd-block class="fd-block"></div>
    </div>`;
    console.log(this.html);
  }

  dragStart(type:string){
    this.fdService.startDrag.id = '';
    switch(type){
      case 'input':{
        this.fdService.startDrag.preHTML = `<input id="abc" [(ngModel)]="context.abc" (change)="context.show()" />`
        break;
      }
      case 'select':{
        this.fdService.startDrag.preHTML = `
        <p-dropdown [options]="[{'name':'jason'},{'name':'tom'}]" optionLabel="name"></p-dropdown>`
        break;
      }
    }
  }

}
