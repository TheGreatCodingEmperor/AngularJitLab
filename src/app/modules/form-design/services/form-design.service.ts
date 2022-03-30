import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class FormDesignInfos{
  id:string;
  index:string;
  preHTML:string;

}

@Injectable({
  providedIn: 'root'
})
export class FormDesignService {
  startDrag:FormDesignInfos = new FormDesignInfos;
  endDrag:FormDesignInfos = new FormDesignInfos;
  ondrop:Subject<boolean> = new Subject();

  constructor() { }
}
