import { Injectable, OnDestroy } from '@angular/core'; 
import { Overlay } from '@angular/cdk/overlay'; 
import { President } from '../models/president.model'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
import { ModalComponent } from '../layout/modal.component'; 
import { ComponentPortal } from '@angular/cdk/portal'; 
import { Router } from '@angular/router'; 
import { ISubscription } from 'rxjs/Subscription'; 
@Injectable() 
export class ModalService implements OnDestroy {   
    private backingStore: ModalMetadata; 
    private subscription: ISubscription;
    constructor(private overlay: Overlay, private router: Router) { 
        this.subscription = router.events.subscribe(()=> { 
            if (this.backingStore) this.backingStore.closeAction(); 
        }); 
    }
    public open(president:President, deleteAction: (id: string) => void) { 
        const filePreviewPortal = new ComponentPortal(ModalComponent); 
        if (!this.backingStore) {
            this.backingStore = new ModalMetadata();
            this.backingStore.deleteAction = deleteAction;
        }
        if (president) {
            this.backingStore.id = president.Name;
            this.backingStore.president = president;       
        } else {
            this.backingStore.id = "";
            this.backingStore.president = new President();
            this.backingStore.president.Name = "¿nombre?";
            this.backingStore.president.Party = "¿partido?";
            this.backingStore.president.HasNonconsecutiveTerms = false;
        }
        if (!this.backingStore.overlayRef) { 
            this.backingStore.overlayRef = this.overlay.create(); 
            this.backingStore.overlayRef.attach(filePreviewPortal); 
        } 
    }
    public getSingletonState():ModalMetadata { 
        return this.backingStore; 
    }
    ngOnDestroy(){ 
        this.subscription.unsubscribe(); 
    } 
}