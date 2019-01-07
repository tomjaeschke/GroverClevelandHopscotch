import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { ViewChild } from '@angular/core';
import { ModalContract } from '../contracts/modal.contract';

@Component({
	selector: 'materials-list',
	templateUrl: './materialsList.component.html',
	styleUrls:  ['./materialsList.component.css']
})


export class MaterialsListComponent implements OnInit {
	public presidents:Array<President>;

	private displayedColumns = ["Name", "Party", "HasNonconsecutiveTerms"];
	
	dataSource: MatTableDataSource<President>;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit(): void{
		this.presidentialContract.getPresidents().toPromise().then(
			function(data) {
				this.presidents = data;
				this.dataSource = new MatTableDataSource<President>(this.presidents);
				this.dataSource.paginator = this.paginator;
			}.bind(this),
			function(error){
				console.log(error);
			});
	}

	constructor(public presidentialContract: PresidentialContract, public modalContract: ModalContract) {
		
	}

	deleteSuccessAct(id: string): void {
		let counter:number = 0;
		let ids:Array<number> = new Array<number>();
		this.presidents.forEach((president) => {
			if (president.Name == id) {
				ids.push(counter);
			}
			counter++;
		});
		ids.reverse();
		ids.forEach((pointToCutAt) => {
			this.presidents.splice(pointToCutAt, 1);
		});
		this.dataSource = new MatTableDataSource<President>(this.presidents);
		this.dataSource.paginator = this.paginator;
    }

	openModal(president:President): void {
		this.modalContract.open(president, this.deleteSuccessAct.bind(this));
	}
}