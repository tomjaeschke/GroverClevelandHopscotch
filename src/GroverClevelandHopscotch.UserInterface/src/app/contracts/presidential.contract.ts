import { Observable } from 'rxjs';
import { President } from '../models/president.model';
export class PresidentialContract {
   constructor() {}
   public deletePresident: (id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void) => void;
   public getPresidents: () => Observable<Array<President>>;
   public setPresident: (president: President, id: string, successAct: () => void, errorAct: (errorCode: number, errorMessage: string) => void) => void;
   public setPresidents: (presidents:Array<President>) => Observable<any>;
}