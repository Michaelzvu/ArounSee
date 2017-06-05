import { Injectable } from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class PlacesService {

  private placesApi = 'http://localhost:8000/Places';  

  constructor (private http: Http) {}
  
  getPlaces(): Observable<JSON[]> {
    return this.http.get(this.placesApi)
                    .map(this.extractData);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
}