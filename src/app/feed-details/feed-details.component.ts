/**
 * Created by Or Sagiv
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
  selector: 'feed-details',  // <arounsee-nav></arounsee-nav>
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './feed-details.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './feed-details.component.html'
})
export class FeedDetailsComponent implements OnInit {

  /**
   * TypeScript public modifiers
   */
  constructor(iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) {
  }

  public ngOnInit() {

  }
}
