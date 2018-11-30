import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../configuration';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Injectable()
export class PresidentialService implements PresidentialContract {
    constructor(private http: Http, private httpClient: HttpClient, private configuration: Configuration) { }

    getPresidents():Observable<Array<President>>{
        let route: string = this.configuration.routeToApi + "api/president";
        return this.httpClient.get<Array<President>>(route,{});
    }

    setPresidents(presidents:Array<President>):Observable<any>{
        let route: string = this.configuration.routeToApi + "api/president";
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(route, presidents, options);
    }
}