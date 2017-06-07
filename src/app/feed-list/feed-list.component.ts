/**
 * Created by zvulun on 02/06/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';

import { PlacesService } from '../_services/places.service';

@Component({
  /**
   * The selector is what angular internally uses
   * for `document.querySelectorAll(selector)` in our index.html
   * where, in this case, selector is the string 'home'.
   */
  selector: 'feed-list',  // <feed-list></feed-list>
  /**
   * Our list of styles in our component. We may add more to compose many styles together.
   */
  styleUrls: [ './feed-list.component.css' ],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './feed-list.component.html'
})
export class FeedListComponent implements OnInit {
  public errorMessage: string;
  public places: JSON[];
  public mode = 'Observable';

  /**
   * TypeScript public modifiers
   */
  constructor(private placesService: PlacesService
  ) {}

  public getPlaces() {
    this.placesService.getPlaces()
                     .subscribe(
                       (places) => this.places = places,
                       (error) =>  this.errorMessage = <any> error);
  }

  public ngOnInit() {
      this.getPlaces();
  }
}
