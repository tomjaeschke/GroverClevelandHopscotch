import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls:  ['./list.component.css']
})
export class ListComponent implements OnInit {
    presidents:Array<PresidentPlus>;
    constructor(public presidentialContract : PresidentialContract) {
        
    }

    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = PresidentialSorterModule.Sort(data);
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}