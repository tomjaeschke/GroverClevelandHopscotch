import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
import { ValidationRules } from '../models/validationRules.model';
export module PresidentialSorterModule {    
    export function CraftPartyList(presidents:Array<President>): Array<string>{
        let parties:Array<string>;
        if (presidents.length > 1){
            let presidentsCopy:Array<President> = JSON.parse(JSON.stringify(presidents)).sort((yin, yang) => {
                let yinParty:string = "";
                let yangParty:string = "";
                if (yin.Party){
                    yinParty = yin.Party;
                }
                if (yang.Party){
                    yangParty = yang.Party;
                }
                if (yinParty.toUpperCase() > yangParty.toUpperCase()){
                    return 1;
                }
                if (yinParty.toUpperCase() < yangParty.toUpperCase()){
                    return -1;
                }
                return 0;
            });
            let counter:number = 1;
            parties = [presidentsCopy[0].Party];
            while (counter < presidentsCopy.length){
                if (presidentsCopy[counter].Party + "" != parties[parties.length-1] + ""){
                    if (presidentsCopy[counter].Party) {
                        parties.push(presidentsCopy[counter].Party);  
                    }                
                }
                counter++;
            }
        } else {
            if (presidents.length == 0) {
                parties = [];
            } else {
                parties = [presidents[0].Party]
            }
        }
        return parties;
    }
    
    export function SanityCheckName(presidents:Array<President>, validationRules:ValidationRules, onSuccess:(presidents:Array<President>)=>void):void{
        let sortedPresidents = new Array<President>();
        let isBadName:Boolean = false;
        presidents.forEach((president) => {
            if (!president.Name) {
                isBadName = true;
            } else {
                let isMatch = !!president.Name.match(validationRules.PresidentialNameValidationRule);
                if (!isMatch) isBadName = true;
            }
            sortedPresidents.push(JSON.parse(JSON.stringify(president)));
        });
        if (isBadName) {
            alert(validationRules.ErrorMessageForName);
        } else {
            sortedPresidents = sortedPresidents.sort((yin, yang) => {
                if (yin.Name > yang.Name){
                    return 1;
                }
                if (yin.Name < yang.Name){
                    return -1;
                }
                    return 0;
                });
            let namePlaceholder:string = "";
            sortedPresidents.forEach((sortedPresident) => {
                if (sortedPresident.Name == namePlaceholder) {
                    isBadName = true;
                }
                namePlaceholder = sortedPresident.Name;
            });
            if (isBadName) {
                alert(validationRules.ErrorMessageForName);
            } else {
                onSuccess(presidents);
            }
        }
    }

    export function SanityCheckParty(presidents:Array<President>, validationRules:ValidationRules, onSuccess:(presidents:Array<President>)=>void):void{
        let sortedPresidents = new Array<President>();
        let isBadParty:Boolean = false;
        presidents.forEach((president) => {
            if (president.Party) {
                let isMatch = !!president.Party.match(validationRules.PresidentialPartyValidationRule);
                if (!isMatch) isBadParty = true;
            }
        });
        if (isBadParty) {
            alert(validationRules.ErrorMessageForParty);
        } else {
            onSuccess(presidents);
        }
    }
    
    export function Sort(presidents:Array<President>):Array<PresidentPlus> {
        let counter:number = 0;
        let nonconsecutivePresident:PresidentPlus = null;
        let nonconsecutivePresidentBench:PresidentPlus = null;
        let output:Array<PresidentPlus> = new Array<PresidentPlus>();      
        let isEvenDeepInNonconsecutiveness: Boolean;
        presidents.forEach((spot:President): void => {
            isEvenDeepInNonconsecutiveness = false;       
            let president:PresidentPlus = MapPresidentToPresidentPlus(presidents[counter]);
            counter++;
            if(nonconsecutivePresidentBench) {               
                nonconsecutivePresident = <PresidentPlus>JSON.parse(JSON.stringify(nonconsecutivePresidentBench));      
            } else {
                nonconsecutivePresident = null;
            }            
            if(president.HasNonconsecutiveTerms) {
                nonconsecutivePresidentBench = MapPresidentToPresidentPlus(<President>JSON.parse(JSON.stringify(president)));
            } else {
                nonconsecutivePresidentBench = null;
            }
            if (counter > 2 && presidents[counter-3].HasNonconsecutiveTerms && presidents[counter-2].HasNonconsecutiveTerms){
                let backwardsCounter:number = 3;
                isEvenDeepInNonconsecutiveness = true;
                let isToKeepIncrementing:Boolean = true;
                while (backwardsCounter < counter) {                  
                    backwardsCounter++;
                    if (presidents[counter-backwardsCounter].HasNonconsecutiveTerms){
                        if (isToKeepIncrementing) {
                            isEvenDeepInNonconsecutiveness = !isEvenDeepInNonconsecutiveness;
                        }
                    } else {
                        isToKeepIncrementing = false;
                    }
                }
                if (isEvenDeepInNonconsecutiveness) {
                    output.push(GuaranteeAmbiguousObjectIsPresidentPlus(nonconsecutivePresident));
                }              
            }  
            output.push(president);
            if (nonconsecutivePresident && !isEvenDeepInNonconsecutiveness){
                output.push(GuaranteeAmbiguousObjectIsPresidentPlus(nonconsecutivePresident));
            }         
        });
        if(output[output.length-1].Name != presidents[presidents.length-1].Name){
            if (presidents[presidents.length-1].HasNonconsecutiveTerms){
                let lastPresident:PresidentPlus = MapPresidentToPresidentPlus(presidents[presidents.length-1]);
                output.push(lastPresident);
            }
        }
        output[output.length-1].IsCurrentPresident = true;
        counter = 0;
        output.forEach((spot:PresidentPlus): void => {
            counter++;
            spot.Positions.push(counter);
            if (spot.HasNonconsecutiveTerms) {
                if (counter > 2) {
                    if (spot.Name == output[counter-3].Name){
                        spot.Positions.unshift(counter-2);
                        output[counter-3].Positions.push(counter);
                    }
                }
            }
        });
        return output;
    }

    export function FlattenFluffyList(presidents:Array<PresidentPlus>):Array<PresidentPlus> {
        let output:Array<PresidentPlus> = new Array<PresidentPlus>();
        let counter:number = 0;
        presidents.forEach((president) => {
            if (counter > 1) {
                if (president.Name != presidents[counter-2].Name){
                    output.push(president);
                }
            } else {
                output.push(president);
            }
            counter++;
        });
        return output;
    }

    function MapPresidentToPresidentPlus(president:President):PresidentPlus{
        let presidentPlus:PresidentPlus = new PresidentPlus();
        presidentPlus.Name = president.Name;
        presidentPlus.Party = president.Party;
        presidentPlus.HasNonconsecutiveTerms = president.HasNonconsecutiveTerms;
        presidentPlus.IsCurrentPresident = false;
        presidentPlus.Positions = new Array<number>();
        return presidentPlus;
    }

    function GuaranteeAmbiguousObjectIsPresidentPlus(ambiguousObject:any):PresidentPlus{
        let presidentPlus:PresidentPlus = new PresidentPlus();
        presidentPlus.Name = ambiguousObject.Name;
        presidentPlus.Party = ambiguousObject.Party;
        presidentPlus.HasNonconsecutiveTerms = ambiguousObject.HasNonconsecutiveTerms;
        presidentPlus.IsCurrentPresident = ambiguousObject.IsCurrentPresident;
        presidentPlus.Positions = ambiguousObject.Positions;
        return presidentPlus;
    }
}