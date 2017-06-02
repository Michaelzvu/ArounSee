/**
 * Created by zvulun on 02/06/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'arounsee-nav',  // <arounsee-nav></arounsee-nav>
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './arounsee-nav.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './arounsee-nav.component.html'
})
export class ArounseeNavComponent implements OnInit {

  /**
   * TypeScript public modifiers
   */
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
  }

  public ngOnInit() {

  }
}
