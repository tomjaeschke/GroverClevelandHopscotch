import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
import { ModalContract } from '../contracts/modal.contract'; 
@Component({ 
    selector: 'modal', 
    templateUrl: './modal.component.html', 
    styleUrls:  ['./modal.component.css'] 
}) 
export class ModalComponent implements OnInit { 
    @ViewChild('add') add: ElementRef<HTMLElement>;   
    @ViewChild('closer') closer: ElementRef<HTMLElement>;
    @ViewChild('delete') delete: ElementRef<HTMLElement>;
    @ViewChild('face') face: ElementRef<HTMLElement>;
    @ViewChild('hat') hat: ElementRef<HTMLElement>;
    private modalMetadata: ModalMetadata;
    @ViewChild('no') no: ElementRef<HTMLElement>;
    @ViewChild('opener') opener: ElementRef<HTMLFormElement>;
    @ViewChild('sure') sure: ElementRef<HTMLElement>;
    @ViewChild('update') update: ElementRef<HTMLElement>;
    @ViewChild('yes') yes: ElementRef<HTMLElement>;

    constructor(public modalContract: ModalContract) {}

    ngOnInit() {
        this.modalMetadata = this.modalContract.getSingletonState();
        if (this.modalMetadata.id) {
            this.add.nativeElement.style.display = "none";
            this.no.nativeElement.style.display = "none";
            this.sure.nativeElement.style.display = "none";
            this.yes.nativeElement.style.display = "none";
        } else {
            this.delete.nativeElement.style.display = "none";
            this.no.nativeElement.style.display = "none";
            this.sure.nativeElement.style.display = "none";
            this.update.nativeElement.style.display = "none";
            this.yes.nativeElement.style.display = "none"; 
        }
    }

    close() { 
        this.modalMetadata.closeAction(); 
    }

    deleteClick() {
        this.closer.nativeElement.style.display = "none";
        this.delete.nativeElement.style.display = "none";
        this.face.nativeElement.style.display = "none";
        this.hat.nativeElement.style.display = "none";
        this.no.nativeElement.style.display = "inline";
        this.opener.nativeElement.readOnly = "true";
        this.sure.nativeElement.style.display = "block";
        this.update.nativeElement.style.display = "none";
        this.yes.nativeElement.style.display = "inline"; 
    }

    noClick() {

    }
}