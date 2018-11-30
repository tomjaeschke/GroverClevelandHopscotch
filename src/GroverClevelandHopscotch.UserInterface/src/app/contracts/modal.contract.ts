import { President } from '../models/president.model'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
export class ModalContract { 
   constructor() {} 
   public open: (president:President) => void; 
   public getSingletonState: () => ModalMetadata; 
}