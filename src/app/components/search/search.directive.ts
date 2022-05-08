/**
 * Custom directive to listen changes and state on search input widget.
 */
import { Directive, OnInit, HostListener, ElementRef } from '@angular/core';
import { SearchComponent } from './search.component';

@Directive({
    selector: "[appSearchInput]"
})
export class SearchInputDirective implements OnInit {

 public placeholder: string = '';

  constructor(private el: ElementRef, private searchComponent: SearchComponent) {}

  ngOnInit() {
    this.placeholder = this.searchComponent.searchLabel || this.el.nativeElement.getAttribute('placeholder');
  }

  // Listen focus and blur events on search input.
  @HostListener("focus") setInputFocus(): void {
    this.el.nativeElement.setAttribute('placeholder', '');
  }

  @HostListener("blur") setInputFocusOut(): void {
    this.el.nativeElement.setAttribute('placeholder', this.placeholder);
  }
}
