import { Injectable } from '@angular/core';
import { ValidationContract } from '../contracts/validation.contract';
import { ValidationRules } from '../models/validationRules.model';
import { President } from '../models/president.model';
import { Observable } from 'rxjs';
import { ISubscription } from 'rxjs/Subscription'
import { Configuration } from '../../configuration';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ValidationService implements ValidationContract {
    private validationRules: ValidationRules; 
    constructor(private httpClient: HttpClient, private configuration: Configuration) { }
    
    public interactWithCacheOfServerSideValidations(presidents:Array<President>, closureThatNeedsValidationRules:(validationRules:ValidationRules, presidents:Array<President>)=>void):void{
        if (this.validationRules) {
            closureThatNeedsValidationRules(this.validationRules, presidents);
        } else {
            let route: string = this.configuration.routeToApi + "api/validation";
            let validationRulesObservable:Observable<ValidationRules> = this.httpClient.get<ValidationRules>(route,{});
            let subscription:ISubscription = validationRulesObservable.subscribe((validationRules:ValidationRules) => {
                this.validationRules = validationRules;
                closureThatNeedsValidationRules(this.validationRules, presidents);
                subscription.unsubscribe();
            });
        }
    }
}