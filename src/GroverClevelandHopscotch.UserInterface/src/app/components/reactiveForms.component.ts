import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'reactive',
    templateUrl: './reactiveForms.component.html',
    styleUrls:  ['./reactiveForms.component.css']
})
export class ReactiveFormsComponent implements OnInit {
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