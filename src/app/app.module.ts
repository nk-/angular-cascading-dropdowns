/**
 * Default module for this project.
 */
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search/results/search-results.component';
import { SearchInputDirective } from './components/search/search.directive';
import { SelectComponent } from './components/form/select/select.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TrafficTypesComponent } from './components/traffic-types/traffic-types.component';
import { TrafficTypesResultComponent } from './components/traffic-types/result/traffic-types-result.component';

@NgModule({
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
