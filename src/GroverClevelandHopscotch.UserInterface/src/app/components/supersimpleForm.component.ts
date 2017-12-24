import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
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
        this.presidentialContract.setPresidents(this.presidents).toPromise().then(
            function(data) {
                window.location.href = "/#/list";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    private createListOfParties():void{
        if (this.presidents.length > 1){
            let presidentsCopy:Array<President> = JSON.parse(JSON.stringify(this.presidents)).sort((yin, yang) => {
                let yinParty:string = "";
                let yangParty:string = "";
                if (yin.Party){
                    yinParty = yin.Party;
                }
                if (yang.Party){
                    yangParty = yang.Party;
                }
                if (yinParty > yangParty){
                    return 1;
                }
                if (yinParty < yangParty){
                    return -1;
                }
                return 0;
            });
            let counter:number = 1;
            this.parties = [presidentsCopy[0].Party];
            while (counter < presidentsCopy.length){
                if (presidentsCopy[counter].Party + "" != this.parties[this.parties.length-1] + ""){
                    if (presidentsCopy[counter].Party) {
                        this.parties.push(presidentsCopy[counter].Party);  
                    }                
                }
                counter++;
            }
        } else {
            if (this.presidents.length == 0) {
                this.parties = [];
            } else {
                this.parties = [this.presidents[0].Party]
            }
        }
    }
}