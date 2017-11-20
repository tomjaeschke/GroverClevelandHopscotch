import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { IpAddress } from '../models/ipAddress.model';
import { IpContract } from '../contracts/ip.contract';
@Component({
    selector: 'ip',
    templateUrl: './ip.component.html'
})
export class IpComponent implements OnInit { 
    greeting:string;
    ipAddress:IpAddress;
    
    constructor(public ipContract: IpContract) {
        
    }

    ngOnInit(): void{
        this.ipContract.getIp().toPromise().then(
            function(data) {
                this.ipAddress = data;
                this.greeting = "Welcome " + this.ipAddress.Ip + " to Grover Cleveland Hopscotch!";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}