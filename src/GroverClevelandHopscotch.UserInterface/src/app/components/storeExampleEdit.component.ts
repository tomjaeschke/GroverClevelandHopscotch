import { Component, Input, Output, EventEmitter } from '@angular/core';
import { President } from '../models/president.model';
@Component({
    selector: 'store-edit',
    templateUrl: './storeExampleEdit.component.html',
    styleUrls:  ['./storeExampleEdit.component.css']
})
export class StoreExampleComponentEdit {
    @Input('presidents') presidents:Array<President>;
    @Output('writeRecords') writeRecords = new EventEmitter<any>();
    public whereTheDraggingStarted: number;
    public presidentWhereTheDraggingStarted: President;

    constructor(){
        this.whereTheDraggingStarted = 0;
    }

    public changeNonconsecutiveness(president: President) : void {
        
    }

    public endDrag(event: any) : void {
        let name = event.srcElement.data;
        if (!name) name = event.srcElement.innerHTML;
    }

    public startDrag(event: any, president: President) : void {
        this.presidentWhereTheDraggingStarted = president;
        this.whereTheDraggingStarted = event.offsetY;
    }

    public save() : void {
        this.writeRecords.emit();
    }
}