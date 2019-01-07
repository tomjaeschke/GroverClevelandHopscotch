import { President } from '../models/president.model'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
export class ModalContract { 
   constructor() {} 
   public open: (president:President, deleteAction: (id: string) => void) => void; 
   public getSingletonState: () => ModalMetadata; 
}