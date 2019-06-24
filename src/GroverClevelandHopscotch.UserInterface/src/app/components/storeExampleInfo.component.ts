import { Component, Input} from '@angular/core';
import { PresidentPlus } from '../models/presidentPlus.model';
@Component({
    selector: 'store-info',
    templateUrl: './storeExampleInfo.component.html',
    styleUrls:  ['./storeExampleInfo.component.css']
})
export class StoreExampleComponentInfo {
    @Input('presidentsPlus') presidentsPlus:Array<PresidentPlus>;
}