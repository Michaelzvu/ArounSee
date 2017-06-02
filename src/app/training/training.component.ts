/**
 * Created by zvulun on 02/06/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'training',  // <training></training>
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './training.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit {
  /**
   * Set our default values
   */
  public localState = { value: '' };
  /**
   * TypeScript public modifiers
   */
  constructor(
  ) {}

  public ngOnInit() {

  }
}
