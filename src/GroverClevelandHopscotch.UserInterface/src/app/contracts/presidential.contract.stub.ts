import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { President } from '../models/president.model';  
import { PresidentialContract } from '../contracts/presidential.contract';
@Injectable()
export class PresidentialContractStub implements PresidentialContract {
    constructor() { }

    addPresident(president: President, successAct: (president: President) => void, errorAct: (errorCode: number, errorMessage: string) => void): void {

    }

    deletePresident(id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void): void {

    }

    getPresidents(): Observable<Array<President>> {
        let president:President = new President();
        return Observable.of(new Array<President>()).map(o => [president]);
    }

    setPresident(president: President, id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void): void {

    }

    setPresidents(presidents:Array<President>): Observable<any> {
        return Observable.of().map(o => {});
    }
}