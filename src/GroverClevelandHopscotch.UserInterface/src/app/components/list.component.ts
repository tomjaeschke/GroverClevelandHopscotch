import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
    presidents:Array<President>;
    constructor(public presidentialContract : PresidentialContract) {
        
    }

    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = data;
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}