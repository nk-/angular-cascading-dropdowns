/**
 * Custom component, search input autcomplete-like widget.
 */
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-types',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  defaultLabel = 'Search types and models';
  // public searchInput: string = '';
  public searchLoaderShow: boolean = false;
  public searchCollapse: boolean = false;
  public searchWrapperClass: boolean = false;

  // Just as an example;
  private apiURL = "https://api.github.com/";

  // Inputs.
  @Input() searchInput: string = '';
  @Input() searchLabel: string = '';
  @Input() searchLoader: boolean = false;

  @Output() searchQuery: string = '';

  constructor() {}

  ngOnInit() {
    this.searchLabel = this.searchLabel || this.defaultLabel;
    this.searchCollapse = this.width < 880 ? true : false;
  }

  // TypeScript get method.
  public get width() {
    return window.innerWidth;
  }

  onClick(value: string) {
    this.searchCollapse = this.width < 880 ? !this.searchCollapse : false;
    this.searchWrapperClass = !this.searchCollapse;
    if (value) {
      this.searchInput = '';
      this.searchQuery = '';
    }
  }

  // Just an example of async call,
  // with some response back (search results).
  async onInputModelChange(value: string) {
    var self = this;
    type TimeoutType = ReturnType<typeof setTimeout>;
    let timeout = 0; //TimeoutType = new setTimeout();

    if (this.searchLoader) {
      this.searchLoaderShow = true;
    }
    // We did not want loader and did not set it in the parent template.
    else {
      return;
    }
    await new Promise((resolve, error) => {
      timeout = setTimeout(() => {
        resolve('Fetched');
      }, 900);
    }).then(() => {
      self.searchLoaderShow = false;
      self.searchQuery = self.searchInput;
    })
    // Clear timeout here, always good.
    .finally(() => {
      if (typeof timeout === 'number') {
        clearTimeout(timeout);
      }
    })
    .catch(error => console.error(error));
  }
}
