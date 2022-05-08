import { Pipe, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficTypesComponent } from './traffic-types.component';
import { TrafficMeisterImportItem } from './traffic-types.service';
import { SelectComponent } from '../form/select/select.component';

interface DefaultObject {
  [key: string]: string;
}


describe('TrafficTypesComponent', () => {
  let component: TrafficTypesComponent;
  let fixture: ComponentFixture<TrafficTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonModule, FormsModule ],
      declarations: [
        TrafficTypesComponent,
        SelectComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test loading data from external file.
  it('should load data from external service', () => {
    const fixture = TestBed.createComponent(TrafficTypesComponent);
    const component = fixture.componentInstance;
    const select = TestBed.createComponent(SelectComponent);
    const selectComponent = select.componentInstance;


    //spyOn(component.trafficMeisterService.import, 'fetchData');
    const defaultTypes = ['car', 'airplane', 'train'];
    const data: TrafficMeisterImportItem = {
      id: 1,
      type: 'car',
      brand: 'bugatti_veyron',
      colors: ['black', 'red'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg'
    }
    component.trafficMeisterService.import.fetchData(function(error: string, data: Array<TrafficMeisterImportItem>) {

      component.trafficMeisterService.parseData(component, data);

      component.trafficMeisterService.emitter.emit(component.trafficTypes);

      component.typesOptions = {
        car: 'Car',
        airplane: 'Airplane',
        train: 'train'
      };
      fixture.detectChanges();

      let trafficTypesWrapper = fixture.nativeElement as HTMLElement;
      let trafficTypeSelect = trafficTypesWrapper?.querySelector('select');

      Object.keys(component.typesOptions).forEach((option: string) => {
        const opt = document.createElement('option');
        opt.value = option;
        //opt['ng-reflect-value'] = option;
        opt.textContent = component.typesOptions[option];
        trafficTypeSelect?.insertBefore(opt, trafficTypeSelect?.lastElementChild);
        //insertAfter(optionMarkup, trafficTypeSelect?.lastElementChild);
      });

      component.typeValue = 'car';
      fixture.detectChanges();

      selectComponent.options = component.typesOptions;
      select.detectChanges();
      selectComponent.value = 'car';
      select.detectChanges();




      // let modelOptions: DefaultObject = {};
      //
      // Object.keys(component.trafficTypes['car']?.brands).map((brand) => {
      //   let id = component.trafficTypes['car'].brands[brand].id;
      //   let label = component.trafficTypes['car'].brands[brand].label;
      //   console.log(label);
      //   modelOptions[id] = label || '';
      // });
      // component.modelOptions = modelOptions;
      fixture.detectChanges();


      console.log(trafficTypesWrapper?.querySelectorAll('select'));

      // selectComponent.value = 'car';
      // selectComponent.options = component.typesOptions;
      // select.detectChanges(); //selectComponent.emitObject();
      //
      // fixture.detectChanges();
      // const response = {
      //   label: 'Car',
      //   value: 'car',
      //   id: '1',
      //   op: 'change',
      //   var: {type: 'car'}
      // };
      // component.trafficMeisterService.subscribe(component, response);
      //
      // //
      // //trafficTypeSelect?.querySelector('select')?.setAttribute('value', 'car');
      // fixture.detectChanges();
      //
      // //const modelTypeSelect = trafficTypeSelect?.querySelectorAll('select');
      // //console.log(trafficTypeSelect?.querySelector('select'));
      // console.log(trafficTypeSelect);

      //expect(component.trafficMeisterService.import.fetchData).toHaveBeenCalled();
      expect(Object.keys(component.trafficTypes)).toEqual(defaultTypes);


     });



     //expect(component.trafficMeisterService.import.fetchData).toHaveBeenCalled();

  });

  // it('should have ready parsed data, new structure', () => {
  //    const defaultTypes = ['car', 'airplane', 'train'];
  //    const fixture = TestBed.createComponent(TrafficTypesComponent);
  //    fixture.detectChanges();
  //    const component = fixture.componentInstance;
  //    console.log(component.trafficTypes);
  //    //expect(Object.keys(component.trafficTypes)).toEqual(defaultTypes);
  // });

});
