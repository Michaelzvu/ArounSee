import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

export interface IPlace {
  id: string;
  imageUrl: string;
  name: string;
}

@Injectable()
export class PlacesService {
  private placesApi = 'http://localhost:8080/places';
  private placesByLocation = '/getPlacesByLatLng/';
  private placeById = '/getPlaceById/';
  private places: JSON[];

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

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
}
