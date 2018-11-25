import { Injectable } from '@angular/core';
import { ModalComponent } from '../layout/modal.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay } from '@angular/cdk/overlay';
import { President } from '../models/president.model';

@Injectable()
export class ModalService {   
    constructor(private overlay: Overlay) { }
    public open(president:President) {
        const overlayInstance = this.overlay.create();
        const filePreviewPortal = new ComponentPortal(ModalComponent);
        overlayInstance.attach(filePreviewPortal);
    }
}