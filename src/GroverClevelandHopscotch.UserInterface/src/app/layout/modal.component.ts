import { Component} from '@angular/core';
import { President } from '../models/president.model';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls:  ['./modal.component.css']
})

export class ModalComponent {
    public president: President;
	public closeAction: () => {};

	constructor(){
		
	}

	close() {
		console.log("Coming soon");
	}
}