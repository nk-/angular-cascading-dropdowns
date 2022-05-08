/**
 * Service for ascading/dependant dropdown widgets.
 */
import { Injectable, EventEmitter } from "@angular/core";
import { TrafficTypesComponent } from './traffic-types.component';
import { FormServiceEmit } from '../form/form.service';

export interface EmitTrafficMeister {
  [key: string]: EmitTrafficMeisterDetail;
}

interface EmitTrafficMeisterDetail {
  id: number;
  label: string;
  type: string;
  brands: {
    [key: string]: {
      id: string;
      type: string;
      label?: string;
      colors?: Array<string>;
      img?: string;
      options?: {
        [key: string]: string;
      }
    }
  }
}

interface TrafficMeisterFile {
  id: number;
  type: string;
  brand: string;
  colors: Array<string>;
  img: string;
}

interface TrafficMeisterImport {
  fetchData: any;
  //((error: string, data: Array<TrafficMeisterFile>)) => boolean;
}

export interface TrafficMeisterImportItem {
  id: number;
  type: string;
  brand: string;
  colors: Array<string>;
  img: string;
}

export interface TrafficTypeResults {
  img: string;
  color: string;
  label: string;
}

declare const trafficMeister: TrafficMeisterImport;

@Injectable({
  providedIn: "root"
})

export class TrafficTypesService {
  public emitter: EventEmitter<EmitTrafficMeister> = new EventEmitter<EmitTrafficMeister>();
  public resultEmitter: EventEmitter<TrafficTypeResults> = new EventEmitter<TrafficTypeResults>();

  public import: TrafficMeisterImport = trafficMeister;

  constructor() {
    //this.import = trafficMeister ? trafficMeister : {fetchData: (error: string, data: Array<TrafficMeisterFile>) => data};
  }

  prepareResult(component: TrafficTypesComponent) {
    let result: TrafficTypeResults = Object.create({});
    if (component.typeValue !== 'none' && component.modelValue !== 'none') {
      if (component.result && component.trafficTypes[component.typeValue] && component.trafficTypes[component.typeValue].brands) {
        const brand = component.trafficTypes[component.typeValue].brands[component.modelValue];
        component.result.img = brand && brand.img ? brand.img : '';
        component.result.label = brand && brand.label ? brand.label : '';

        if (component.colorValue && component.colorValue === 'none') {
          component.result.color = 'transparent';
        }
        else if (component.colorValue && component.colorValue !== 'none') {
          component.result.color = component.colorValue;
        }
        result = component.result;
      }
    }
    return result;
  }

  parseData(component: TrafficTypesComponent, data: Array<TrafficMeisterImportItem>) {
    // var self = this;
    data.map((result: TrafficMeisterImportItem) => {

      // Options for 1st dropdown.
      component.typesOptions[result.type] = result.type.charAt(0).toUpperCase() + result.type.slice(1);

      // Create a new structure for this data.
      component.trafficTypes[result.type] = <EmitTrafficMeisterDetail>{};
      component.trafficTypes[result.type].id = result.id;
      component.trafficTypes[result.type].label = result.type.charAt(0).toUpperCase() + result.type.slice(1);
      component.trafficTypes[result.type].brands = {};
    });

    Object.keys(component.trafficTypes).map((type: string) => {
      data.map((item: TrafficMeisterImportItem) => {
        if (type === item.type) {
          const brandValue = item.brand.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ /g,"_").toLowerCase();
          component.trafficTypes[type].brands[brandValue] = {
            id: brandValue,
            type: type,
            label: item.brand,
            colors: item.colors,
            img: item.img,
          };
        }
      });
    });
  }

  subscribe(component: TrafficTypesComponent, response: FormServiceEmit) {
    let result;
    switch (response.id) {
      case 'type':

        component.modelOptions = {};
        component.typeValue = response.value;
        // Generate models now (options for selected traffic type).
        if (component.trafficTypes[response.value] && component.trafficTypes[response.value].brands) {
          Object.values(component.trafficTypes[response.value].brands)?.map((types: any) => {
            component.modelOptions[types.id] = types.label;
          });
        }

        component.modelValue = 'none';
        component.colorValue = 'none';
        // Emit those changes now to nested dropdowns.
        result = this.prepareResult(component);
        this.resultEmitter.emit(result);
      break;

      case 'model':

        // Set current value first.
        component.modelValue = response.value;

        // Loading new colors for new selection.
        component.colorOptions = {};
        // Generate models now (options for selected traffic type).
        if (component.trafficTypes[component.typeValue] && component.trafficTypes[component.typeValue].brands) {
          component.trafficTypes[component.typeValue]?.brands[component.modelValue]?.colors?.map((color) => {
            component.colorOptions[color] = color.charAt(0).toUpperCase() + color.slice(1);
          });
        }

        component.colorValue = 'none';
        // Emit those changes now to nested dropdowns.
        result = this.prepareResult(component);
        this.resultEmitter.emit(result);
      break;

      case 'color':
        component.colorValue = response.value;
        // Emit those changes now to nested dropdowns.
        result = this.prepareResult(component);
        this.resultEmitter.emit(result);
      break;
    }
  }
}
