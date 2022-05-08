import { Component, OnInit } from '@angular/core';
import { TrafficTypesService, TrafficTypeResults } from '../traffic-types.service';

export interface TrafficTypeResult {
  img: string;
  color: string;
  label: string;
}

@Component({
  selector: 'app-traffic-types-result',
  templateUrl: './traffic-types-result.component.html',
  styleUrls: ['./traffic-types-result.component.css']
})

export class TrafficTypesResultComponent implements OnInit {

  public result: TrafficTypeResults  = {
    img: '',
    color: '',
    label: ''
  }

  constructor(private service: TrafficTypesService) { }

  ngOnInit() {
    this.service.resultEmitter.subscribe(response => {
      this.result = response;
    });
  }
}
