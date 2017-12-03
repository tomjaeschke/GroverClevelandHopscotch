import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
import { PresidentialSorter } from '../utilities/presidentialSorter.utility';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    presidents:Array<PresidentPlus>;
    constructor(public presidentialContract : PresidentialContract) {
        
    }

    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = PresidentialSorter.Sort(data);
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}