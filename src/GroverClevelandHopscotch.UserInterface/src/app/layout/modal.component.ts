import { Component, Inject } from '@angular/core';
import { President } from '../models/president.model';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls:  ['./modal.component.css']
})

export class ModalComponent {
    //@Inject(CONTAINER_DATA) public componentData: any

	constructor(){

	}

	close() {
		console.log("Coming soon");
	}
}