import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Injectable()
export class PresidentialService implements PresidentialContract {
    constructor(private httpClient: HttpClient, private configuration: Configuration) { }

    getPresidents():Observable<Array<President>>{
        let route: string = this.configuration.routeToApi + "api/president";
        return this.httpClient.get<Array<President>>(route,{});
    }
}