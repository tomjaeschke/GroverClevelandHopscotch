import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { IpAddress } from '../models/ipAddress.model';
import { IpContract } from '../contracts/ip.contract';
@Injectable()
export class IpContractStub implements IpContract {
    constructor() { }

    getIp():Observable<IpAddress>{
        let ipAddress:IpAddress = new IpAddress();
        ipAddress.Ip = "127.0.0.1";
        return Observable.of(new IpAddress()).map(o => ipAddress);
    }
}