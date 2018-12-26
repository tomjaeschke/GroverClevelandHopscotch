import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { PresidentialSorterModule } from '../modules/presidentialSorter.module';
import { ValidationContract } from '../contracts/validation.contract';
import { ValidationRules } from '../models/validationRules.model';
@Component({
    selector: 'reactive',
    templateUrl: './reactiveForms.component.html',
    styleUrls:  ['./reactiveForms.component.css']
})
export class ReactiveFormsComponent implements OnInit {   
    @ViewChild('newItem') newItem: ElementRef; 
    cache:Array<President>;
    presidentsForm:FormGroup; 
    parties:Array<string>;
    isToShowControls:boolean;
    constructor(public presidentialContract : PresidentialContract, public validationContract: ValidationContract) { }

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

    updateCache(isToUpdateEverything?:boolean){
        let counter = 0;
        this.cache.forEach((datum) => {
            datum.Name = this.presidentsForm.controls['lineItems']['controls'][counter]['controls']['name'].value;
            datum.Party = this.presidentsForm.controls['lineItems']['controls'][counter]['controls']['party'].value;
            datum.HasNonconsecutiveTerms = this.presidentsForm.controls['lineItems']['controls'][counter]['controls']['hasNonconsecutiveTerms'].value;
            counter++;
        });
    }

    changeCheckbox(position:number) {
        this.updateCache();
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
        this.isToShowControls = true;
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

    delete(): void {
        this.updateCache();
        this.cache = this.cache.slice(0,this.cache.length - 1);
        this.renderOutList(this.cache);
    }

    moveUp(position:number): void {
        this.move(position, true);
    }

    moveDown(position:number): void {
        this.move(position, false);
    }

    private move(position:number,isToMoveUpwards:boolean){
        let dancePartner:number;
        if (isToMoveUpwards) {
            dancePartner = position - 1;
        } else {
            dancePartner = position + 1;
        }
        this.updateCache();
        let revampArray: Array<President> = new Array<President>();
        let counter = 0;
        while (counter < this.cache.length) {
            if (counter !== position) {
                if(dancePartner === counter) {
                    if (!isToMoveUpwards) revampArray.push(this.cache[dancePartner]);
                    revampArray.push(this.cache[position]);
                    if (isToMoveUpwards) revampArray.push(this.cache[dancePartner]);
                } else {
                    revampArray.push(this.cache[counter]);
                }
            }
            counter ++;
        }
        this.renderOutList(revampArray);
    }

    private calculateListOfParties():void{
        this.parties = PresidentialSorterModule.CraftPartyList(this.calculatePresidentsFromForm());
    }

    private updateFillInTheBlankSister(fillInTheBlankSister:FormControl, event:any){
        fillInTheBlankSister.setValue(event.target.options[event.target.options.selectedIndex].value);
    }

    public add():void{
        let presidents:President[] = this.calculatePresidentsFromForm();
        let president = new President();
        president.Name = this.newItem.nativeElement.value;
        president.Party = "";
        president.HasNonconsecutiveTerms = false;
        presidents.push(president);
        this.validationContract.interactWithCacheOfServerSideValidations(presidents, this.nameAddClosure.bind(this));
    }
    
    public nameAddClosure(validationRules: ValidationRules, presidents: Array<President>):void{
        PresidentialSorterModule.SanityCheckName(presidents, validationRules, this.nameAddSuccess.bind(this));
    }
    
    public nameAddSuccess(presidents: Array<President>):void{
        this.updateCache();
        this.cache.push(presidents[presidents.length - 1]);     
        this.renderOutList(this.cache);
        this.newItem.nativeElement.value = "";
    }
    
    public submit():void{
        let presidents:President[] = this.calculatePresidentsFromForm();
        this.validationContract.interactWithCacheOfServerSideValidations(presidents, this.nameSubmitClosure.bind(this));
    }
    
    public nameSubmitClosure(validationRules: ValidationRules, presidents: Array<President>):void{
        PresidentialSorterModule.SanityCheckName(presidents, validationRules, this.nameSubmitSuccess.bind(this));
    }
    
    public nameSubmitSuccess(presidents: Array<President>):void{
        this.validationContract.interactWithCacheOfServerSideValidations(presidents, this.partySubmitClosure.bind(this));
    }
    
    public partySubmitClosure(validationRules: ValidationRules, presidents: Array<President>):void{
        PresidentialSorterModule.SanityCheckParty(presidents, validationRules, this.partySubmitSuccess.bind(this));
    }
    
    public partySubmitSuccess(presidents: Array<President>):void{
        this.presidentialContract.setPresidents(presidents).toPromise().then(
            function(data) {
                window.location.href = "/#/list";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}