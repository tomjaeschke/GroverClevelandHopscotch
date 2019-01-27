import { Component, OnInit, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { ModalMetadata } from '../models/modalMetadata.model';
import { ModalContract } from '../contracts/modal.contract';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({ 
    selector: 'modal', 
    templateUrl: './modal.component.html', 
    styleUrls:  ['./modal.component.css']
}) 
export class ModalComponent implements OnInit, DoCheck { 
    @ViewChild('add') add: ElementRef<HTMLElement>; 
    @ViewChild('checky') checky: ElementRef<HTMLInputElement>;
    @ViewChild('closer') closer: ElementRef<HTMLElement>;
    private potentialRevision: President;
    @ViewChild('delete') delete: ElementRef<HTMLElement>;
    @ViewChild('face') face: ElementRef<HTMLElement>;
    @ViewChild('hat') hat: ElementRef<HTMLElement>;
    private id: string;
    public isCheckboxDisabled: Boolean;
    private modalMetadata: ModalMetadata;
    @ViewChild('no') no: ElementRef<HTMLElement>;
    @ViewChild('opener') opener: ElementRef<HTMLFormElement>;
    @ViewChild('sure') sure: ElementRef<HTMLElement>;
    @ViewChild('update') update: ElementRef<HTMLElement>;
    @ViewChild('yes') yes: ElementRef<HTMLElement>;

    constructor(public modalContract: ModalContract, public presidentialContract : PresidentialContract) {}

    ngOnInit() {
        this.modalMetadata = this.modalContract.getSingletonState();
        this.id = this.modalMetadata.id;
        this.setTheStage();
    }

    ngDoCheck() {
        if (this.id != this.modalMetadata.id){
            this.id = this.modalMetadata.id;
            this.setTheStage();
        }
    }

    checkyChange(): void {
        this.potentialRevision.HasNonconsecutiveTerms = this.checky.nativeElement.checked;
    }

    close() { 
        this.modalMetadata.closeAction(); 
    }

    deleteClick() {
        this.closer.nativeElement.style.display = "none";
        this.delete.nativeElement.style.display = "none";
        this.face.nativeElement.style.display = "none";
        this.hat.nativeElement.style.display = "none";
        this.isCheckboxDisabled = true;
        this.no.nativeElement.style.display = "inline";
        this.opener.nativeElement.readOnly = "true";
        this.sure.nativeElement.style.display = "block";
        this.update.nativeElement.style.display = "none";
        this.yes.nativeElement.style.display = "inline"; 
    }

    deleteErrorAct(errorCode: number, errorMessage: string): void {
        alert("The deletion was unsuccessful!");
    }

    deleteSuccessAct(): void {
        this.modalMetadata.deleteActionWrapper();
    }

    nameChange(event: Event): void {
        const control = <HTMLInputElement>event.target;
        this.potentialRevision.Name = control.value;
    }

    noClick() {
        this.closer.nativeElement.style.display = "block";
        this.delete.nativeElement.style.display = "inline";
        this.face.nativeElement.style.display = "block";
        this.hat.nativeElement.style.display = "block";
        this.isCheckboxDisabled = false;
        this.no.nativeElement.style.display = "none";
        this.opener.nativeElement.readOnly = "";
        this.sure.nativeElement.style.display = "none";
        this.update.nativeElement.style.display = "inline";
        this.yes.nativeElement.style.display = "none"; 
    }

    partyChange(event: Event): void {
        const control = <HTMLInputElement>event.target;
        this.potentialRevision.Party = control.value;
    }

    putErrorAct(errorCode: number, errorMessage: string): void {
        alert(errorMessage);
    }

    putSuccessAct(): void {
        this.modalMetadata.president.Name = this.potentialRevision.Name;
        this.modalMetadata.president.Party = this.potentialRevision.Party;
        this.modalMetadata.president.HasNonconsecutiveTerms = this.potentialRevision.HasNonconsecutiveTerms;
        this.close();
    }

    setTheStage(){
        if (this.modalMetadata.president.HasNonconsecutiveTerms) {
            this.checky.nativeElement.checked = true;
        } else {
            this.checky.nativeElement.checked = false;
        }
        if (this.id) {
            this.add.nativeElement.style.display = "none";
            this.no.nativeElement.style.display = "none";
            this.sure.nativeElement.style.display = "none";
            this.yes.nativeElement.style.display = "none";
            this.delete.nativeElement.style.display = "inline";
            this.update.nativeElement.style.display = "inline";
        } else {
            this.add.nativeElement.style.display = "inline";
            this.delete.nativeElement.style.display = "none";
            this.no.nativeElement.style.display = "none";
            this.sure.nativeElement.style.display = "none";
            this.update.nativeElement.style.display = "none";
            this.yes.nativeElement.style.display = "none"; 
        }
        this.potentialRevision = new President();
        this.potentialRevision.Name = this.modalMetadata.president.Name;
        this.potentialRevision.Party = this.modalMetadata.president.Party;
        this.potentialRevision.HasNonconsecutiveTerms = this.modalMetadata.president.HasNonconsecutiveTerms;
    }

    yesClick() {
        this.presidentialContract.deletePresident(this.modalMetadata.id, this.deleteSuccessAct.bind(this), this.deleteErrorAct);
    }

    updateClick() {
        this.presidentialContract.setPresident(this.potentialRevision, this.modalMetadata.id, this.putSuccessAct.bind(this), this.putErrorAct);
    }
}