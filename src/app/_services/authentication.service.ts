import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    private authApi = 'http://localhost:8888/authentication';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    constructor(private http: Http) { }

    public login(username: string, password: string) {
        return this.http.post(this.authApi + '/login',{username, password})
            .map((response: any) => {
                // login successful if there's a jwt token in the response
                let id = response._body;
                if (id) {
                    // store user details and jwt token in local storage to keep
                    // user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({id, username, password}));
                }
            });
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
