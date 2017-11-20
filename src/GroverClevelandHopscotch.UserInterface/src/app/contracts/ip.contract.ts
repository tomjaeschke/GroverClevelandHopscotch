import { Observable } from 'rxjs/Observable';
import { IpAddress } from '../models/ipAddress.model';
export class IpContract {
   constructor() {}
   public getIp: () => Observable<IpAddress>;
}