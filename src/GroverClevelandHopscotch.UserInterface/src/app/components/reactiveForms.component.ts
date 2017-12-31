import { Component, OnInit } from '@angular/core';
import { President } from '../models/president.model';
import { PresidentialContract } from '../contracts/presidential.contract';
import { FormsModule, ReactiveFormsModule, FormGroup, NgForm, FormArray, FormControl } from '@angular/forms';
@Component({
    selector: 'reactive',
    templateUrl: './reactiveForms.component.html',
    styleUrls:  ['./reactiveForms.component.css']
})
export class ReactiveFormsComponent implements OnInit {   
    presidentsForm:FormGroup;
    constructor(public presidentialContract : PresidentialContract) {
        
    }

    ngOnInit(): void{
        this.presidentsForm = new FormGroup({
            'lineItems': new FormArray([])
        });
        this.presidentialContract.getPresidents().toPromise().then(
            function(data) {
                let presidents:FormArray = new FormArray([]);
                data.forEach((president)=>{
                    presidents.push(
                        new FormGroup({
                            'name': new FormControl(president.Name),
                            'party': new FormControl(president.Party),
                            'hasNonconsecutiveTerms': new FormControl(president.HasNonconsecutiveTerms)
                        })
                    );
                });
                this.presidentsForm = new FormGroup({
                    'lineItems': presidents
                });
            }.bind(this),
            function(error){
                console.log(error);
            });
    }

    submit(): void {
        let presidents:President[] = [];
        let formArray:any = this.presidentsForm.controls['lineItems'];
        formArray.controls.forEach((formGroup:FormGroup):void => {
            let president:President = new President;
            president.Name = formGroup.controls['name'].value;
            president.Party = formGroup.controls['party'].value;
            president.HasNonconsecutiveTerms = formGroup.controls['hasNonconsecutiveTerms'].value;
            presidents.push(president);
        });
        this.presidentialContract.setPresidents(presidents).toPromise().then(
            function(data) {
                window.location.href = "/#/list";
            }.bind(this),
            function(error){
                console.log(error);
            });
    }
}