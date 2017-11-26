import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { TimeMessage } from '../models/timeMessage.model';
import { TimeContract } from '../contracts/time.contract';
@Component({
    selector: 'clock',
    templateUrl: './bulletPoint.component.html'
})
export class ClockComponent implements OnInit { 
    greeting:string;
    
    constructor(public timeContract: TimeContract) {
        
    }

    ngOnInit(): void{
        this.timeContract.getTime().toPromise().then(
            function(data) {
                this.greeting = "The universal Greenwich time is " + data.FriendlyFormatTime + " currently.";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}