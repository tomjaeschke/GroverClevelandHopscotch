import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
import { PresidentPlus } from '../models/presidentPlus.model';
import { DumbComponentToSmartComponentDto } from '../models/dumbComponentToSmartComponentDto.model';
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

    alterNonconsecutiveness(president: President): void {
        
    }

    reorderRecords(dto: DumbComponentToSmartComponentDto): void {
        this.presidents = PresidentialSorterModule.Drag(dto.Finish, dto.Start, dto.Name, this.presidents);
        this.presidentsPlus = PresidentialSorterModule.Sort(this.presidents);
    }

    writeRecords(): void {
        
    }
}