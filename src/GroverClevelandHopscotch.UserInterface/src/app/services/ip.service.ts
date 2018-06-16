import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
import { IpAddress } from '../models/ipAddress.model';
import { IpContract } from '../contracts/ip.contract';
@Injectable()
export class IpService implements IpContract {
    constructor(private httpClient: HttpClient, private configuration: Configuration) { }

    getIp():Observable<IpAddress>{
        let route: string = this.configuration.routeToApi + "api/ip";
        return this.httpClient.get<IpAddress>(route,{});
    }
}