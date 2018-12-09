import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
import { ModalContract } from '../contracts/modal.contract'; 
@Component({ 
    selector: 'modal', 
    templateUrl: './modal.component.html', 
    styleUrls:  ['./modal.component.css'] 
}) 
export class ModalComponent implements OnInit { 
    @ViewChild('add') add: ElementRef<HTMLElement, any>;   
    @ViewChild('closer') closer: ElementRef<HTMLElement, any>;
    @ViewChild('delete') delete: ElementRef<HTMLElement, any>;
    @ViewChild('face') face: ElementRef<HTMLElement, any>;
    @ViewChild('hat') hat: ElementRef<HTMLElement, any>;
    private modalMetadata: ModalMetadata;
    @ViewChild('no') no: ElementRef<HTMLElement, any>;
    @ViewChild('opener') opener: ElementRef<HTMLElement, any>;
    @ViewChild('sure') sure: ElementRef<HTMLElement, any>;
    @ViewChild('update') update: ElementRef<HTMLElement, any>;
    @ViewChild('yes') yes: ElementRef<HTMLElement, any>;

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

    deleteClick():void {
        
    }

    noClick():void {

    }
}