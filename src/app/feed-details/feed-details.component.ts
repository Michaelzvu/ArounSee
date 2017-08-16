/**
 * Created by Or Sagiv
 */
import {
  Component,
  OnInit
} from '@angular/core';
import { IPlace, PlacesService } from '../_services/places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DomSanitizer} from '@angular/platform-browser';
import {MdIconRegistry} from '@angular/material';

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
  public id: String;

  /**
   * TypeScript public modifiers
   */
  constructor(private router: ActivatedRoute,
              private placesService: PlacesService,
              iconRegistry: MdIconRegistry, 
              public sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon(
        'website',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_public_24px.svg'));
        iconRegistry.addSvgIcon(
        'phone',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_local_phone_24px.svg'));
        iconRegistry.addSvgIcon(
        'time',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_schedule_24px.svg'));
        iconRegistry.addSvgIcon(
        'room',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_room_24px.svg'));
            iconRegistry.addSvgIcon(
        'map',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/ic_directions_24px.svg'));
        

              }

  public getPlaces() {
     if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.placesService.getPlaces(position.coords.latitude,position.coords.longitude)
                     .subscribe(
                       this.update.bind(this),
                       (error) =>  this.errorMessage = <any> error);
    
   });
   }
  }

  public update(place) {
    this.place = place;
  }

  sanitize(linkData :string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(linkData);
}

  public ngOnInit() {
    this.place = JSON.parse("{\"name\":\"\",\"image\":\"\",\"id\":\"\"}");
    
    this.router.params.subscribe(this.idFromUrl.bind(this));
  }

  private idFromUrl(params) {
    this.id = ""+params['id'];
    this.placesService.getPlaceById(this.id)
       .subscribe(
         this.update.bind(this),
       (error) =>  this.errorMessage = <any> error);
  }
}
