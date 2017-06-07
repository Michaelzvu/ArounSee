import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export interface IPlace {
  id: string;
  imageUrl: string;
  name: string;
}

@Injectable()
export class PlacesService {
  private placesApi = 'http://localhost:8000/Places';
  private places: JSON[];

  constructor (private http: Http) {}

  public getPlaces(): Observable<JSON[]> {
    return this.http.get(this.placesApi)
                    .map(this.extractData);
  }

  public setPlaces(places: any) {
    this.places = places;
  }

  public getPlaceById(id: number) {
   /* return this.http.get(this.placesApi + '/' + id)
      .map(this.extractData);*/
   if (!this.places) {
     return;
   }
   return this.places.find((place: any) => place.id === id.toString());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
