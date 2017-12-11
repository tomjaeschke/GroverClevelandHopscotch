import { Observable } from 'rxjs/Observable';
import { President } from '../models/president.model';
export class PresidentialContract {
   constructor() {}
   public getPresidents: () => Observable<Array<President>>;
   public setPresidents: (presidents:Array<President>) => Observable<any>;
}