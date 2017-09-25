import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'register',  // <register></register>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./register.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './register.component.html'
})
export class RegisterComponent {
    public model: any = {};
    public loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    public register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
              (data) => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
              (error) => {
                    console.error(error);
                    this.loading = false;
                });
    }
}
