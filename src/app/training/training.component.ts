/**
 * Created by zvulun on 02/06/2017.
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { IPlace, PlacesService } from '../_services/places.service';

interface ITrainingModel extends IPlace {
  hidden: boolean;
}

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
  styleUrls: ['./training.component.css'],
  /**
   * Every Angular template is first compiled by the browser before Angular runs it's compiler.
   */
  templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit {
  public errorMessage: string;
  public places: ITrainingModel[];
  public mode = 'Observable';
  private counter: number;

  /**
   * TypeScript public modifiers
   */
  constructor(private placesService: PlacesService) {}

  public ngOnInit() {
    this.counter = 0;
    this.getPlaces();
  }

  public moveToNext() {
    this.places[this.counter].hidden = true;
    this.counter++;
    this.places[this.counter].hidden = false;
  }

  private getPlaces() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.placesService.getPlaces(position.coords.latitude, position.coords.longitude)
          .subscribe(
            this.update.bind(this),
            (error) => console.error(this.errorMessage));

      });
    }
  }

  private update(places) {
    this.places = places.map((place: any) => {
      return {
        id: place.id,
        mainImage: place.mainImage,
        name: place.name,
        activityHours: place.activityHours,
        address: place.address,
        images: place.images,
        openingHours: place.openingHours,
        phone: place.phone,
        priceLevel: place.priceLevel,
        rating: place.rating,
        review: place.review,
        website: place.website,
        hidden: true
      };
    });

/*    places = [];
    places.push({id: 1});
    places.push({id: 2});
    places.push({id: 3});
    places.push({id: 4});
    places.push({id: 5});
    this.places = places.map((place: any) => {
      return {
        id: place.id,
        mainImage: 'http://www.agenceducentre.co.il/images/agenceducentre/s1.jpg',
        name: 'Netanya',
        activityHours: '09:00 - 17:00',
        address: 'Netanya, Israel',
        images: [],
        openingHours: '09:00 - 17:00',
        phone: '09-12321312',
        priceLevel: '2',
        rating: '1',
        review: '"Hotel at a new level, professional and courteous staff. Beautiful décor. Breathtaking sea view - made ' +
        'by God. New style bedroom layout, not the typical. would strongly recommend to anyone needing a great break."',
        website: 'http://www.netanya.com',
        hidden: true
      };
    });*/

    if (this.places && this.places.length) {
      this.places[0].hidden = false;
    }
  }
}
