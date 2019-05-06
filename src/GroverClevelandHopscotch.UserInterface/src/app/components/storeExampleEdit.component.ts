import { Component, Input } from '@angular/core';
import { President } from '../models/president.model';
@Component({
    selector: 'store-edit',
    templateUrl: './storeExampleEdit.component.html',
    styleUrls:  ['./storeExampleEdit.component.css']
})
export class StoreExampleComponentEdit {
    @Input('presidents') presidents:Array<President>;

    public startDrag(event: any){
        console.log('start');
        console.log(event);
    }

    public endDrag(event: any){
        console.log('end');
        console.log(event);
    }
}