import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'store',
    templateUrl: './storeExample.component.html',
    styleUrls:  ['./storeExample.component.css']
})
export class StoreExampleComponent implements OnInit {
    presidents:Array<President>;
    
    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = data;
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    constructor(public presidentialContract : PresidentialContract) { }
}