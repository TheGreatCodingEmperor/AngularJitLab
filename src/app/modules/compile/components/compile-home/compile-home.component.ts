import { CommonModule } from '@angular/common';
import '@angular/compiler';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnInit, Type, TypeDecorator, ViewContainerRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { MegaMenu } from 'primeng/megamenu';
import { SharedModule } from 'src/app/modules/shared/shared.module';

type SafeAny = any;

@Component({
  selector: 'app-compile-home',
  template: `
    <p>
      compile-home works!
    </p>
  `,
  styles: [
  ]
})
export class CompileHomeComponent implements OnInit {

  constructor(
    private vcr: ViewContainerRef,
  ) { }

  ngOnInit(): void {
    let NewEventEmitter = () => { return new EventEmitter<SafeAny>() };
    let file = `
    <ngx-component>
    <ngx-selector>compile-main</ngx-selector>
    <ngx-inputs></ngx-inputs>
    <ngx-outputs></ngx-outputs>
    <ngx-html><p class="bg-rr">123</p> <compile-com1 [bankName]="abc" (bankNameChange)="show()"  (valueChange)="abc=$event"></compile-com1></ngx-html>
    <ngx-style>.bg-rr{background:red}</ngx-style>
    <ngx-script>(class context{abc=1;show(){alert('show!')}})</ngx-script>
    </ngx-component>

    <ngx-component>
    <ngx-selector>compile-com1</ngx-selector>
    <ngx-inputs>['bankName']</ngx-inputs>
    <ngx-outputs>['bankNameChange','valueChange']</ngx-outputs>
    <ngx-html><p-card (click)="change()"><p class="bg-gg">{{bankName}}</p><input (input)="value($event)"/></p-card></ngx-html>
    <ngx-style>.bg-gg{background:gray}</ngx-style>
    <ngx-script>(class context{abc=1;bankNameChange =NewEventEmitter();valueChange = NewEventEmitter();change(){this.bankNameChange.emit(123);}value(event){this.valueChange.emit(event.target.value)}})</ngx-script>
    </ngx-component>
    `;
    let compReg = new RegExp(/<ngx-component>[\s\S]*?<\/ngx-component>/, 'g');
    let selectorReg = new RegExp(/<ngx-selector>[\s\S]*?<\/ngx-selector>/, 'i');
    let inputsReg = new RegExp(/<ngx-inputs>[\s\S]*?<\/ngx-inputs>/, 'i');
    let outputsReg = new RegExp(/<ngx-outputs>[\s\S]*?<\/ngx-outputs>/, 'i');
    let htmlReg = new RegExp(/<ngx-html>[\s\S]*?<\/ngx-html>/, 'i');
    let styleReg = new RegExp(/<ngx-style>[\s\S]*?<\/ngx-style>/, 'i');
    let scriptReg = new RegExp(/<ngx-script>[\s\S]*?<\/ngx-script>/, 'i');
    let components = file.match(compReg);
    let componentArr = [];
    for (let component of components) {
      let selector = component.match(selectorReg)[0]?.replace(`<ngx-selector>`, '').replace(`<\/ngx-selector>`, '');
      let inputs = component.match(inputsReg)[0]?.replace(`<ngx-inputs>`, '').replace(`<\/ngx-inputs>`, '');
      let outputs = component.match(outputsReg)[0]?.replace(`<ngx-outputs>`, '').replace(`<\/ngx-outputs>`, '');
      let html = component.match(htmlReg)[0]?.replace(`<ngx-html>`, '').replace(`<\/ngx-html>`, '');
      let style = component.match(styleReg)[0]?.replace(`<ngx-style>`, '').replace(`<\/ngx-style>`, '');
      let script = component.match(scriptReg)[0]?.replace(`<ngx-script>`, '').replace(`<\/ngx-script>`, '');
      console.log(selector)
      let component1 = this.createComponentType(selector, html, [style], eval(script), eval(inputs), eval(outputs));
      componentArr = componentArr.concat(component1);
    }
    // let component1Raw = {
    //   html: `123 <compile-com1 [(bankName)]="context.abc"></compile-com1>`,
    //   styles: [``],
    //   context: new (eval(`(class context{abc=1;show(){alert('show!')}})`))
    // }
    // let component1 = this.createComponentType('compile-main',component1Raw.html, component1Raw.styles, component1Raw.context,[]);
    // let component2Raw = {
    //   html: `<p-card>{{bankName}}</p-card>`,
    //   styles: [``],
    //   context: new (eval(`(class context{abc=1;show(){alert('show!')}})`))
    // }
    // let component2 = this.createComponentType('compile-com1',component2Raw.html, component2Raw.styles, component2Raw.context,['bankName', 'id: account-id']);
    console.log(componentArr);
    let moduleRef = this.createModuleType(componentArr);
    let componentRef = this.vcr.createComponent(componentArr[0]);
  }

  private createComponentType(
    selector: string,
    html: string,
    styles: string[],
    context: SafeAny,
    inputs: string[],
    outputs: string[]
  ): Type<SafeAny> {
    const metadata: Component = {};
    metadata.selector = selector;
    metadata.template = html;
    metadata.styles = [...styles];
    metadata.changeDetection = ChangeDetectionStrategy.Default;
    metadata.inputs = inputs;
    metadata.outputs = outputs;

    // const componentType = class AdhocComponent {
    //   context: SafeAny = context;
    //   ngOnInit(){
    //     console.log('begin')
    //   }
    // };

    const componentType = context;
    const componentTypeCreator: TypeDecorator = Component(metadata);
    // noinspection UnnecessaryLocalVariableJS
    const decoratedComponentType = componentTypeCreator(componentType);
    return decoratedComponentType;
  }

  private createModuleType(
    componentTypes: Type<SafeAny>[],
  ): Type<SafeAny> {
    let metadata: NgModule = {};

    // if (!_.isNil(this.module)) {
    //   metadata = _.cloneDeep(this.module);
    // }

    let imports = [CommonModule, FormsModule, ReactiveFormsModule, SharedModule]
    metadata.imports = metadata.imports || [];
    metadata.imports = metadata.imports.concat(imports || []);

    metadata.declarations = metadata.declarations || [];
    metadata.declarations = metadata.declarations.concat(componentTypes);

    const moduleType = class AdhocModule {
      // nothing
    };
    const moduleTypeDecorator: TypeDecorator = NgModule(metadata);
    // noinspection UnnecessaryLocalVariableJS
    const decoratedModuleType = moduleTypeDecorator(moduleType);
    return decoratedModuleType;
  }
}

