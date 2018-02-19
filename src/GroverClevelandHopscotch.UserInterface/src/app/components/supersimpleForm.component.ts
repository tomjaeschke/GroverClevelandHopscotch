import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
@Component({
    selector: 'simple',
    templateUrl: './superSimpleForm.component.html',
    styleUrls:  ['./superSimpleForm.component.css']
})
export class SuperSimpleFormComponent implements OnInit {
    presidents:Array<President>;
    parties:Array<string>;
    constructor(public presidentialContract : PresidentialContract) {
        
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

    public pushToServer():void{
        if(PresidentialSorterModule.IsBadName(this.presidents)){
            alert ("Names cannot be dupes nor empty!");
        } else {
            this.presidentialContract.setPresidents(this.presidents).toPromise().then(
                function(data) {
                    window.location.href = "/#/list";
                }.bind(this),
                function(error){
                    console.log(error);
                });
        }
    }

    private createListOfParties():void{
        this.parties = PresidentialSorterModule.CraftPartyList(this.presidents);
    }
}