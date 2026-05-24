import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null; // has no real used because used in the previous message setup
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective | undefined; // used for programatic creation of alert component, and also for dynamic component loading in general

  private closeSub!: Subscription; // used to store the subscription to the close event of the alert component, so that we can unsubscribe when the component is destroyed, to avoid memory leaks

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log('Authentication successful:', resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log('Authentication failed:', errorMessage);
        this.error = errorMessage; // used in previous message setup, no more used
        this.showErrorAlert(errorMessage); // needs only when using programatic creation of alert component
        this.isLoading = false;
      },
    );
    form.reset();
  }

  onCloseErrorAlert() {
    this.error = null;
  }
  // when auth is removed the subscribtion needs to be removed manually, to avoid memory leaks, but when using programatic creation of alert component, the subscription is handled in the showErrorAlert method, and also the alert component is removed from the DOM when closed, so no need to handle it here
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  // Programatic creation of alert component
  private showErrorAlert(message: string) {
    // need to instanciate the alert component, import is needed, and also the component factory resolver
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost!.viewContainerRef;
    hostViewContainerRef.clear(); // clear the container before creating the component, to avoid multiple alerts stacking up
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message; // pass the error message to the alert component instance
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub?.unsubscribe(); // unsubscribe from the close event when the alert is closed, to avoid memory leaks
      hostViewContainerRef.clear(); // clear the container when the alert is closed, to remove the alert component from the DOM
    });
  }
}
