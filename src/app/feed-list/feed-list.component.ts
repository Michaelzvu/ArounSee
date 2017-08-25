/**
 * Created by zvulun on 02/06/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { IPlace, PlacesService } from '../_services/places.service';
import { Router } from '@angular/router';

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
  styleUrls: ['./feed-list.component.css'],
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
  constructor(private router: Router,
              private placesService: PlacesService,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'star',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_star_border_24px.svg'));

  }

  public getPlaces() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.placesService.getPlaces(position.coords.latitude, position.coords.longitude)
          .subscribe(
            this.update.bind(this),
            (error) => console.error(this.errorMessage));

      });
    }
  }

  public update(places) {
    this.places = places;
    this.placesService.setPlaces(places);
  }

  public ngOnInit() {
    this.getPlaces();
  }

  public openDetails(place: IPlace) {
    this.router.navigate(['/details', place.id]);
  }
}
