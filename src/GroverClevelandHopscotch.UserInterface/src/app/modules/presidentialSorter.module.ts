import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
export module PresidentialSorterModule {
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
                nonconsecutivePresident = JSON.parse(JSON.stringify(nonconsecutivePresidentBench));       
            } else {
                nonconsecutivePresident = null;
            }            
            if(president.HasNonconsecutiveTerms) {
                nonconsecutivePresidentBench = JSON.parse(JSON.stringify(president));
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
                    output.push(nonconsecutivePresident);
                }              
            }  
            output.push(president);
            if (nonconsecutivePresident && !isEvenDeepInNonconsecutiveness){
                output.push(nonconsecutivePresident);
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
            spot.ImmediatePosition = counter;
        });
        return output;
    }

    function MapPresidentToPresidentPlus(president:President):PresidentPlus{
        let presidentPlus:PresidentPlus = new PresidentPlus();
        presidentPlus.Name = president.Name;
        presidentPlus.Party = president.Party;
        presidentPlus.HasNonconsecutiveTerms = president.HasNonconsecutiveTerms;
        presidentPlus.IsCurrentPresident = false;
        presidentPlus.ImmediatePosition = 0;
        return presidentPlus;
    }
}