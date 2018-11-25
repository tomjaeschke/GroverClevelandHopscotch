import { President } from '../models/president.model';
export class ModalContract {
   constructor() {}
   public open: (president:President) => void;
}