import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { getErrorLogger } from '@angular/core/src/errors';

export interface IPlace {
  id: string;
  mainImage: string;
  name: string;
  activityHours: string;
  address: string;
  images: string[];
  openingHours: string[];
  phone: string;
  priceLevel: string;
  rating: string;
  review: string;
  website: string;
}

@Injectable()
export class PlacesService {
  private placesApi = 'http://localhost:8888/places';
  private placesByLocation = '/getPlacesByLatLng/';
  private placeById = '/getPlaceById/';
  private places: JSON[];
  private geoLocation: Position;

  constructor(private http: Http) {}

  public getPlaces(lat: number, lon: number): Observable<JSON[]> {
    return this.http.get(this.placesApi + this.placesByLocation + lat + '/' + lon)
      .map(this.extractData);
  }

  public setPlaces(places: any) {
    this.places = places;
  }

  public getPlaceById(id: String) {
    return this.http.get(this.placesApi + this.placeById + id)
      .map(this.extractData);
    //   var source = Observable.from(this.places).filter((x: any)=>  x.id === id.toString());
    //   return source;
  }

  public getGeoLocation(callback: Function) {
    if (this.geoLocation) {
      callback(this.geoLocation);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.geoLocation = position;
        callback(this.geoLocation);
      });
    }
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
