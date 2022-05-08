/**
 * Some basic (karma) testing for this project.
 */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search/results/search-results.component';
import { SearchInputDirective } from './components/search/search.directive';
import { SelectComponent } from './components/form/select/select.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TrafficTypesComponent } from './components/traffic-types/traffic-types.component';

import { TrafficTypesResultComponent } from './components/traffic-types/result/traffic-types-result.component';

import { FormServiceEmit } from './components/form/form.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        SearchComponent,
        SearchResultsComponent,
        SearchInputDirective,
        SelectComponent,
        LoaderComponent,
        TrafficTypesComponent,
        TrafficTypesResultComponent
      ],
      providers: [
        Title
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Dynamic title testing rules.
  it('should run dynamic title request', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;

    const emitObject: FormServiceEmit = {
      label: 'Car',
      value: 'car',
      id: 'type',
      op: 'change',
      var: {type: 'car'}
    }
    spyOn(component.formService.emitter, 'emit');
    component.formService.emitter.emit(emitObject);
    expect(component.formService.emitter.emit).toHaveBeenCalledWith(emitObject);
  });

  it('should render dynamic title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    const title = compiled.querySelector('h1');
    // component.titleService.setTitle('Set this title');
    const currentTitle = component.titleService.getTitle();
    expect(title?.textContent).toBe(currentTitle);
  });

});
