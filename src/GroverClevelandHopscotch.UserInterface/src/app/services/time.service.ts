import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TimeMessage } from '../models/timeMessage.model';
import { TimeContract } from '../contracts/time.contract';
@Injectable()
export class TimeService implements TimeContract {
    constructor(private httpClient: HttpClient) { }

    getTime():Observable<TimeMessage>{
        let route: string = environment.routeToApi + "api/clock";
        return this.httpClient.get<TimeMessage>(route,{});
    }
}