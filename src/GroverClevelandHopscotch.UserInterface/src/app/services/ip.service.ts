import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IpAddress } from '../models/ipAddress.model';
import { IpContract } from '../contracts/ip.contract';
@Injectable()
export class IpService implements IpContract {
    constructor(private httpClient: HttpClient) { }

    getIp():Observable<IpAddress>{
        let route: string = environment.routeToApi + "api/ip";
        return this.httpClient.get<IpAddress>(route,{});
    }
}