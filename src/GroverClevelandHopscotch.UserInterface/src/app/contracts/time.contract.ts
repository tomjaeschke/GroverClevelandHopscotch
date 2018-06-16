import { Observable } from 'rxjs';
import { TimeMessage } from '../models/timeMessage.model';
export class TimeContract {
   constructor() {}
   public getTime: () => Observable<TimeMessage>;
}