import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { TimeMessage } from '../models/timeMessage.model';
import { TimeContract } from '../contracts/time.contract';
@Injectable()
export class TimeService implements TimeContract {
    constructor(private httpClient: HttpClient, private configuration: Configuration) { }

    getTime():Observable<TimeMessage>{
        let route: string = this.configuration.routeToApi + "api/clock";
        return this.httpClient.get<TimeMessage>(route,{});
    }
}