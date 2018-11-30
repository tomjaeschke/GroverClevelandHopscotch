import { Component, OnInit } from '@angular/core'; 
import { ModalMetadata } from '../models/modalMetadata.model'; 
import { ModalContract } from '../contracts/modal.contract'; 
@Component({ 
 selector: 'modal', 
 templateUrl: './modal.component.html', 
 styleUrls:  ['./modal.component.css'] 
}) 
export class ModalComponent implements OnInit { 
 private modalMetadata: ModalMetadata; 
  
 constructor(public modalContract: ModalContract) {}
 ngOnInit() { 
  this.modalMetadata = this.modalContract.getSingletonState();  
 }
 close() { 
  this.modalMetadata.closeAction(); 
 } 
}