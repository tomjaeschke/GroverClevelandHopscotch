import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../configuration';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Injectable()
export class PresidentialService implements PresidentialContract {
    private route: string;
    
    constructor(private http: Http, private httpClient: HttpClient, private configuration: Configuration) {
        this.route = this.configuration.routeToApi + "api/president/";
    }

    deletePresident(id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void):void {
        this.http.delete(this.route + id).toPromise().then(function(){
            successAct();
        }, function(error){
            errorAct(error.status, JSON.parse(error._body).Message);
        });
    }

    getPresidents():Observable<Array<President>>{
        return this.httpClient.get<Array<President>>(this.route,{});
    }

    setPresident(president: President, id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void):void {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.put(this.route + id, president, options).toPromise().then(function(){
            successAct();
        }, function(error){
            errorAct(error.status, JSON.parse(error._body).Message);
        });
    }

    setPresidents(presidents:Array<President>):Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.route, presidents, options);
    }
}