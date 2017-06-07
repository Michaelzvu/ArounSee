/**
 * Created by Or Sagiv
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { IPlace, PlacesService } from '../_services/places.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  public errorMessage: string;
  public place: JSON;
  public id: number;

  /**
   * TypeScript public modifiers
   */
  constructor(private router: ActivatedRoute,
              private placesService: PlacesService) {
  }

  public getPlaces() {
    this.placesService.getPlaces()
      .subscribe(
        this.update.bind(this),
        (error) =>  this.errorMessage = <any> error);
  }

  public update(place) {
    this.place = place;
  }

  public ngOnInit() {
    this.router.params.subscribe(this.idFromUrl.bind(this));
  }

  private idFromUrl(params) {
    this.id = +params['id'];
    this.place = this.placesService.getPlaceById(this.id);
      // .subscribe(
      //   this.update.bind(this),
      //   (error) =>  this.errorMessage = <any> error);
  }
}
