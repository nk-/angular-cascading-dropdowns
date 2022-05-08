/**
 * Custom component, a sub-component of a search widget.
 * Returns results and display in pane.
 */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  @Input() searchQuery: string = '';
  public searchResults = [
    'Car',
    'Airplane',
    'Train'
  ]

  constructor() {}
  ngOnInit() {}
}
