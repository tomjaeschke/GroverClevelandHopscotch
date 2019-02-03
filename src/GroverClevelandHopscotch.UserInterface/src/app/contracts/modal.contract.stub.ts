import { Injectable } from '@angular/core';
import { President } from '../models/president.model'; 
import { ModalContract } from '../contracts/modal.contract';
import { ModalMetadata } from '../models/modalMetadata.model'; 
@Injectable()
export class ModalContractStub implements ModalContract {
    constructor() { }

    open(president:President, deleteAction: (id: string) => void): void {

    }

    getSingletonState(): ModalMetadata {
        let modalMetadata: ModalMetadata = new ModalMetadata();
        modalMetadata.id = "Grover Cleveland";
        modalMetadata.president = new President();
        modalMetadata.president.Name = "Grover Cleveland";
        modalMetadata.president.Party = "Democrat";
        modalMetadata.president.HasNonconsecutiveTerms = true;
        modalMetadata.act = (id: string) => {};
        return modalMetadata;
    }
}