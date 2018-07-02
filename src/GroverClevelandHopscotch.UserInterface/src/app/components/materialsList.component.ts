import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
@Component({
    selector: 'materials-list',
    templateUrl: './materialsList.component.html',
    styleUrls:  ['./materialsList.component.css']
})
export class MaterialsListComponent implements OnInit {
    public presidents:Array<President>;
    private displayedColumns = ["Name", "Party", "HasNonconsecutiveTerms"];

    ngOnInit(): void{
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.presidents = data;
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    constructor(public presidentialContract : PresidentialContract) {
        
    }
}