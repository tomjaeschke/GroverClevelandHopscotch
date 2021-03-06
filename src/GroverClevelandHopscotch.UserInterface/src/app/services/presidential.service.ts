import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Injectable()
export class PresidentialService implements PresidentialContract {
    private route: string;
    
    constructor(private http: Http, private httpClient: HttpClient) {
        this.route = environment.routeToApi + "api/president/";
    }

    addPresident(president: President, successAct: (president: President) => void, errorAct: (errorCode: number, errorMessage: string) => void):void {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.route, president, options).toPromise().then(function(boomarang){
            successAct(boomarang["_body"]);
        }, function(error){
            errorAct(error.status, JSON.parse(error._body).Message);
        });
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