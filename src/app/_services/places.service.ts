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

  public
  constructor (private http: Http) {}

  public getPlaces(): Observable<JSON[]> {
    return this.http.get(this.placesApi)
                    .map(this.extractData);
  }

  // This function is stupid and temporary
  public setPlaces() {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}
