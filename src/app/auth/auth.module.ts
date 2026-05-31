import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    FormsModule,
    CommonModule,
    SharedModule,
  ],
  exports: [],
})
export class AuthModule {}
