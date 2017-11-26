import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { TimeMessage } from '../models/timeMessage.model';
import { TimeContract } from '../contracts/time.contract';
@Injectable()
export class TimeContractStub implements TimeContract {
    constructor() { }

    getTime():Observable<TimeMessage>{
        let timeMessage:TimeMessage = new TimeMessage();
        timeMessage.FriendlyFormatTime = "19 past 9 in the post meridiem on November, 26th of 2017";
        return Observable.of(new TimeMessage()).map(o => timeMessage);
    }
}