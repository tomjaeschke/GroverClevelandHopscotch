import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'store-edit',
    templateUrl: './storeExampleEdit.component.html',
    styleUrls:  ['./storeExampleEdit.component.css']
})
export class StoreExampleComponentEdit {
    public startDrag(event: any){
        console.log('start');
        console.log(event);
    }

    public endDrag(event: any){
        console.log('end');
        console.log(event);
    }
}