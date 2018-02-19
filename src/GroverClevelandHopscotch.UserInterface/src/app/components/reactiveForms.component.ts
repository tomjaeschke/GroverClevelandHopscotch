import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { FormsModule, ReactiveFormsModule, FormGroup, NgForm, FormArray, FormControl } from '@angular/forms';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
@Component({
    selector: 'reactive',
    templateUrl: './reactiveForms.component.html',
    styleUrls:  ['./reactiveForms.component.css']
})
export class ReactiveFormsComponent implements OnInit {   
    cache:Array<President>;
    presidentsForm:FormGroup; 
    parties:Array<string>;
    constructor(public presidentialContract : PresidentialContract) { }

    ngOnInit(): void{
        this.presidentsForm = new FormGroup({
            'lineItems': new FormArray([])
        });
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                this.cache = data;
                this.renderOutList(data);
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    updateCache(){
        let counter = 0;
        this.cache.forEach((datum) => {
            datum.Name = this.presidentsForm.controls['lineItems']['controls'][counter]['controls']['name'].value;
            datum.Party = this.presidentsForm.controls['lineItems']['controls'][counter]['controls']['party'].value;
            counter++;
        });
    }

    changeCheckbox(position:number) {
        this.updateCache();
        this.cache[position].HasNonconsecutiveTerms = !this.cache[position].HasNonconsecutiveTerms;
        this.renderOutList(this.cache);
    }

    renderOutList(data:Array<President>):void {
        let presidents:FormArray = new FormArray([]);
        PresidentialSorterModule.FlattenFluffyList(PresidentialSorterModule.Sort(data)).forEach((president)=>{
            presidents.push(
                new FormGroup({
                    'name': new FormControl(president.Name),
                    'party': new FormControl(president.Party),
                    'hasNonconsecutiveTerms': new FormControl(president.HasNonconsecutiveTerms),
                    'positions': new FormControl(president.Positions)
                })
            );
        });
        this.presidentsForm = new FormGroup({
            'lineItems': presidents
        });
        this.calculateListOfParties();
    }

    calculatePresidentsFromForm():Array<President>{
        let presidents:President[] = [];
        let formArray:any = this.presidentsForm.controls['lineItems'];
        formArray.controls.forEach((formGroup:FormGroup):void => {
            let president:President = new President;
            president.Name = formGroup.controls['name'].value;
            president.Party = formGroup.controls['party'].value;
            president.HasNonconsecutiveTerms = formGroup.controls['hasNonconsecutiveTerms'].value;
            presidents.push(president);
        });
        return presidents;
    }

    submit(): void {
        let presidents:President[] = this.calculatePresidentsFromForm();
        this.presidentialContract.setPresidents(presidents).toPromise().then(
            function(data) {
                window.location.href = "/#/list";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    moveUp(): void {
        
    }

    moveDown(): void {
        
    }

    private calculateListOfParties():void{
        this.parties = PresidentialSorterModule.CraftPartyList(this.calculatePresidentsFromForm());
    }

    private updateFillInTheBlankSister(fillInTheBlankSister:FormControl, event:any){
        fillInTheBlankSister.setValue(event.target.options[event.target.options.selectedIndex].value);
    }
}