/**
 * Custom component - cascading/dependant dropdown widgets.
 * Generates results as per filters/params.
 */
import { Component, OnInit } from '@angular/core';
import { FormService } from '../form/form.service';
import { TrafficTypesService, TrafficTypeResults, TrafficMeisterImportItem, EmitTrafficMeister } from './traffic-types.service';

interface Options {
  [key: string]: string
}

@Component({
  selector: 'app-traffic-types',
  templateUrl: './traffic-types.component.html',
  styleUrls: ['./traffic-types.component.css']
})

export class TrafficTypesComponent implements OnInit {

  public trafficTypes: EmitTrafficMeister = {};

  public typeLabel: string = "What's your traffic type?";
  public typeValue: string = 'none';
  public typesOptions: Options = {};

  public modelLabel: string = 'Fancy a model?';
  public modelValue: string = 'none';
  public modelOptions: Options = {};

  public colorLabel: string = 'With a color?';
  public colorValue: string = 'none';
  public colorOptions: Options = {};

  public result: TrafficTypeResults = {
    img: '',
    color: '',
    label: ''
  }

  constructor(public trafficMeisterService: TrafficTypesService, public formService: FormService) {
    var self = this;
    // Import and process data from external service (js file provided by assignment).
    this.trafficMeisterService.import.fetchData(function(error: string, data: Array<TrafficMeisterImportItem>) {
      if (data && data.length) {
        self.trafficMeisterService.parseData(self, data);
        // Now that data is ready, our structure,
        // emit that up for availability on the other scopes
        self.trafficMeisterService.emitter.emit(self.trafficTypes);
      }
    });
  }

  ngOnInit() {
    // Subscribe to our generic form service,
    // basically an event listener.
    this.formService.emitter.subscribe(response => {
      this.trafficMeisterService.subscribe(this, response);
    });
  }
}
