import { FormsModule} from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './results/search-results.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SearchComponent,
        SearchResultsComponent
      ],
      imports: [
        FormsModule
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render as search input value', () => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    component.searchLabel = 'Some search value';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement.querySelector('label');
    expect(compiled.textContent).toBe('Some search value');
    //expect(component).toBeTruthy();
    // expect(title?.textContent).toContain('traffic-meister app is running!');
  });
});
