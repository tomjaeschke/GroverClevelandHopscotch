import { Injectable, InjectionToken, Injector } from '@angular/core';
import { ModalComponent } from '../layout/modal.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { President } from '../models/president.model';
import { ModalMetadata } from '../models/modalMetadata.model';

@Injectable()
export class ModalService {   
    CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');

    constructor(private overlay: Overlay, private injector: Injector) { }

    createInjector(dataToPass): PortalInjector {
        const injectorTokens = new WeakMap();
        injectorTokens.set(this.CONTAINER_DATA, dataToPass);
        return new PortalInjector(this.injector, injectorTokens);
    }

    public open(president:President) {
        let modalMetadata = new ModalMetadata();
        modalMetadata.closeAction = this.close;        
        modalMetadata.president = president;
        const overlayInstance = this.overlay.create();  
        const filePreviewPortal = new ComponentPortal(ModalComponent, null, this.createInjector(modalMetadata));
        overlayInstance.attach(filePreviewPortal);
    }

    public close(){
        console.log("attempt to close");
    }
}