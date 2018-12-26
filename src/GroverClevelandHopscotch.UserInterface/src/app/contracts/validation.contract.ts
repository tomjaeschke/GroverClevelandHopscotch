import { ValidationRules } from '../models/validationRules.model';
import { President } from '../models/president.model';
export class ValidationContract {
    constructor() {}
    public interactWithCacheOfServerSideValidations: (presidents:Array<President>, closureThatNeedsValidationRules:(validationRules:ValidationRules)=>void) => void;
 }