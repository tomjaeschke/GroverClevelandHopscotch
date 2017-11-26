import { Observable } from 'rxjs/Observable';
import { TimeMessage } from '../models/timeMessage.model';
export class TimeContract {
   constructor() {}
   public getTime: () => Observable<TimeMessage>;
}