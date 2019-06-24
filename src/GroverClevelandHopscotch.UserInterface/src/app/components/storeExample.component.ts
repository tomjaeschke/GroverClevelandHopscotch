import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
import { PresidentPlus } from '../models/presidentPlus.model';
@Component({
    selector: 'store',
    templateUrl: './storeExample.component.html',
    styleUrls:  ['./storeExample.component.css']
})
export class StoreExampleComponent implements OnInit {
    presidents:Array<President>;
    presidentsPlus:Array<PresidentPlus>;
    
    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = data;
                this.presidentsPlus = PresidentialSorterModule.Sort(data);
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    constructor(public presidentialContract : PresidentialContract) { }

    writeRecords(): void {
        
    }
}