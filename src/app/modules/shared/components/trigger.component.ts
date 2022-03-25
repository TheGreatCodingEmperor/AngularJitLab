import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[trigger]',
  styles: [
  ]
})
export class TriggerComponent implements OnInit {
  @Output() trigger = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.trigger.emit();
  }

}
