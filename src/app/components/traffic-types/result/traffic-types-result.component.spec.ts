import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficTypesResultComponent } from './traffic-types-result.component';

describe('TrafficTypesResultComponent', () => {
  let component: TrafficTypesResultComponent;
  let fixture: ComponentFixture<TrafficTypesResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficTypesResultComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficTypesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
