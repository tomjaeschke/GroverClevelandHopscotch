import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
import { ValidationContract } from '../contracts/validation.contract';
import { ValidationRules } from '../models/validationRules.model';
@Component({
    selector: 'simple',
    templateUrl: './superSimpleForm.component.html',
    styleUrls:  ['./superSimpleForm.component.css']
})
export class SuperSimpleFormComponent implements OnInit {
    presidents:Array<President>;
    parties:Array<string>;
    constructor(public presidentialContract : PresidentialContract, public validationContract: ValidationContract) {
        
    }

    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = data;
                this.createListOfParties();
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    private createListOfParties():void{
        this.parties = PresidentialSorterModule.CraftPartyList(this.presidents);
    }

    public pushToServer():void{
        this.validationContract.interactWithCacheOfServerSideValidations(this.presidents, this.pushToServerClosure.bind(this));
    }

    public pushToServerClosure(validationRules: ValidationRules, presidents: Array<President>):void{
        PresidentialSorterModule.SanityCheckName(presidents, validationRules, this.pushToServerSuccess.bind(this));
    }

    public pushToServerSuccess(presidents: Array<President>):void{
        this.presidentialContract.setPresidents(this.presidents).toPromise().then(
            function(data) {
                window.location.href = "/#/list";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}