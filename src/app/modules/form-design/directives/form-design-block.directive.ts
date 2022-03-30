import { Directive, HostListener, Input, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormDesignService } from '../services/form-design.service';

@Directive({
  selector: '[fd-block]'
})
export class FormDesignBlockDirective implements OnInit,OnDestroy {
  /** 
   * 1.this.html => fdService.endDrag.preHtml
   * 2.fdService.startDrag.preHtml => this.html
   * 3.通知 form design component 更換 html(d3 select 更換 div preHtml)
   * 4.通知 fdService.startDrag.div.preHtml = this.preHtml
   * */
  @HostListener('drop', ['$event'])
  onDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    // 1
    this._fdService.endDrag = {
      id : this._viewContainerRef.element.nativeElement.id,
      index: this._viewContainerRef.element.nativeElement.index,
      preHTML : this.preHTML
    }
    // 2
    // this.preHTML = this._fdService.startDrag.preHTML;
    // 3
    this._fdService.ondrop.next(true);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(e){
    e.preventDefault()
    e.stopPropagation();
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(e){
    e.stopPropagation();
    console.log('enter '+this._viewContainerRef.element.nativeElement.id)
  }

  @HostListener('dragstart', ['$event'])
  onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(e);
    this._fdService.startDrag = {
      id : this._viewContainerRef.element.nativeElement.id,
      index: this._viewContainerRef.element.nativeElement.index,
      preHTML : this.preHTML
    }
  }

  /** 編譯前html */
  @Input() preHTML = '';

  changepreHtmlSubscription:Subscription;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _fdService:FormDesignService
    ) { 
  }

  ngOnInit(): void {
    console.log(this._viewContainerRef.element.nativeElement.preHtml);
    this._viewContainerRef.element.nativeElement.draggable = true;
    // this.changepreHtmlSubscription = this._fdService.ondrop.subscribe(res => {
    //   this.preHTML = this._fdService.startDrag.preHTML;
    // });
  }

  ngOnDestroy(): void {
    // if(this.changepreHtmlSubscription){
    //   this.changepreHtmlSubscription.unsubscribe();
    // }
  }

}
