import { Observable } from 'rxjs';
import { IpAddress } from '../models/ipAddress.model';
export class IpContract {
   constructor() {}
   public getIp: () => Observable<IpAddress>;
}