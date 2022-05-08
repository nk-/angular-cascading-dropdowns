/** 
 * Shared service for emitting changes on form elements.
 */
import { Injectable, EventEmitter } from "@angular/core";

export interface FormServiceEmit {
  label: string;
  value: string;
  id: string;
  op: string;
  var: {
    [key: string]: any
  }
}

@Injectable({
  providedIn: "root"
})

export class FormService {
  public emitter: EventEmitter<FormServiceEmit> = new EventEmitter<FormServiceEmit>();
  public value: string = '';
  constructor() {}
}
