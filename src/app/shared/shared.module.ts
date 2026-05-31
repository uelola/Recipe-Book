import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule,
  ],
})
export class SharedModule {}
