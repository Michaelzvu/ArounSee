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
  public errorMessage: string;
  public places: JSON[];
  public firstPlace: any;
  public mode = 'Observable';
  /**
   * TypeScript public modifiers
   */
  constructor(private placesService: PlacesService) {}

  public ngOnInit() {
    this.getPlaces();
  }

  private getPlaces() {
    this.placesService.getPlaces()
      .subscribe(
        (places) => {
          this.places = places;
          this.firstPlace =  this.places[0];
          },
        (error) =>  this.errorMessage = <any> error);
  }
}
