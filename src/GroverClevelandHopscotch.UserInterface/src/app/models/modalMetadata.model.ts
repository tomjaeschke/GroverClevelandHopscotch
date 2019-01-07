import { President } from '../models/president.model'; 
import { OverlayRef } from '@angular/cdk/overlay'; 
export class ModalMetadata { 
    deleteAction: (id: string) => void;
    id: string;
    overlayRef: OverlayRef; 
    president: President;
    public closeAction(){ 
        if(this.overlayRef) { 
            this.overlayRef.dispose(); 
            this.overlayRef = null; 
        } 
    }
    public deleteActionWrapper(){
        this.deleteAction(this.id);
        this.closeAction();
    }
}