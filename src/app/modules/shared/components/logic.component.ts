import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[logic]',
  styles: [
  ]
})
export class LogicComponent implements OnInit {
  @Output() trigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.trigger.emit();
  }

}
