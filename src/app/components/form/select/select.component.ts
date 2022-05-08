/**
 * Custom component, build unique <select> form element widget.
 */
import { Component, OnInit, Input } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormService, FormServiceEmit } from '../form.service';

interface SelectOptions {
  [key: string]: string;
}

@Component({
  selector: 'app-form-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements OnInit {

  @Input() value: string = 'none';
  @Input() label: string = 'Select item';
  @Input() options: SelectOptions = {};
  @Input() id: string = 'default';
  @Input() var: SelectOptions = {};

  constructor(private service: FormService) {}

  ngOnInit() {}

  onChange(value: string) {
    this.value = value;
    this.emitObject();
  }

  emitObject() {
    const emitObject: FormServiceEmit = {
      label: this.label,
      value: this.value,
      id: this.id,
      op: 'change',
      var: this.var
    }
    this.service.emitter.emit(emitObject);
  }
}
