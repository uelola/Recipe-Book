import { Directive, ViewContainerRef } from '@angular/core';

// helper directive to get access to the view container ref of the place where we want to render the alert component, this is needed for programatic creation of alert component, and also for dynamic component loading in general
@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
