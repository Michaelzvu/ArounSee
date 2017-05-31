/**
 * Created by zvulun on 30/05/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';

import { XLargeDirective } from './x-large';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AlertService } from '../_services/alert.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'login',  // <login></login>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [],
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: ['./login.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public model: any = {};
  public loading = false;
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) { }

  public ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        (data) => {
          this.router.navigate([this.returnUrl, 'home']);
        },
        (error) => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
