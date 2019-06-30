import { Component, Input, Output, EventEmitter } from '@angular/core';
import { President } from '../models/president.model';
import { DumbComponentToSmartComponentDto } from '../models/dumbComponentToSmartComponentDto.model';
@Component({
    selector: 'store-edit',
    templateUrl: './storeExampleEdit.component.html',
    styleUrls:  ['./storeExampleEdit.component.css']
})
export class StoreExampleComponentEdit {
    @Input('presidents') presidents:Array<President>;
    @Output('alterNonconsecutiveness') alterNonconsecutiveness = new EventEmitter<President>();
    @Output('reorderRecords') reorderRecords = new EventEmitter<DumbComponentToSmartComponentDto>();
    @Output('writeRecords') writeRecords = new EventEmitter<void>();
    public whereTheDraggingStarted: number;

    constructor(){
        this.whereTheDraggingStarted = 0;
    }

    public changeNonconsecutiveness(president: President) : void {
        this.alterNonconsecutiveness.emit(president);
    }

    public endDrag(event: any) : void {
        let dto:DumbComponentToSmartComponentDto = new DumbComponentToSmartComponentDto();
        dto.Name = event.srcElement.data;
        if (!dto.Name) dto.Name = event.srcElement.innerHTML;
        dto.Start = this.whereTheDraggingStarted;
        dto.Finish = event.offsetY;
        this.reorderRecords.emit(dto);
    }

    public startDrag(event: any, president: President) : void {
        this.whereTheDraggingStarted = event.offsetY;
    }

    public save() : void {
        this.writeRecords.emit();
    }
}