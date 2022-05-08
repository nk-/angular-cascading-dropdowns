/**
 * Default component for this project.
 */
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormService } from './components/form/form.service';
import { TrafficTypesService, EmitTrafficMeister } from './components/traffic-types/traffic-types.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  logoSrc = 'assets/logo.svg';
  logoAlt = 'The Traffic Meister logo';
  defaultTitle = 'The Traffic Meister';

  public trafficMeister: EmitTrafficMeister = {};
  public title: string = this.defaultTitle;

  public constructor(public titleService: Title, private trafficService: TrafficTypesService, public formService: FormService) {

    // Using "Title" service.
    this.titleService.setTitle(this.title);

    this.trafficService.emitter.subscribe((response) => {
      this.trafficMeister = response;
    });

    this.formService.emitter.subscribe((response) => {
      if (response.value !== 'none') {
        this.titleService.setTitle(this.title + '-' + response.value);
      }
      else {
        this.titleService.setTitle(this.defaultTitle);
      }
    });
  }
}
