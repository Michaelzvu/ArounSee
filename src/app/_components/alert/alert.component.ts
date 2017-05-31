import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'alert',  // <alert></alert>
  /**
   * We need to tell Angular's Dependency Injection which providers are in our app.
   */
  providers: [],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
    public message: any;

    constructor(private alertService: AlertService) { }

    public ngOnInit() {
        this.alertService.getMessage().subscribe((message) => { this.message = message; });
    }
}
