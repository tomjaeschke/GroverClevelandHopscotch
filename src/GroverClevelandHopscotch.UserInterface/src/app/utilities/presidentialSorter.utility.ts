import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
export module PresidentialSorter {
    export function Sort(presidents:Array<President>):Array<PresidentPlus> {
        let counter:number = 0;
        let counterFat = 0;
        let nonconsecutivePresident:PresidentPlus = null;
        let nonconsecutivePresidentBench:PresidentPlus = null;
        let output:Array<PresidentPlus> = new Array<PresidentPlus>();       
        presidents.forEach((spot:President): void => {
            let president:PresidentPlus = MapPresidentToPresidentPlus(presidents[counter]);
            president.ImmediatePosition = counter + counterFat;
            counter++;
            if (counter == presidents.length){
                if (!nonconsecutivePresident) {
                    president.IsCurrentPresident = true;
                }         
            }
            if (counter == presidents.length - 1){
                if (president.HasNonconsecutiveTerms) {
                    president.IsCurrentPresident = true;
                }         
            }
            if(nonconsecutivePresidentBench) {               
                nonconsecutivePresident = JSON.parse(JSON.stringify(nonconsecutivePresidentBench));
                nonconsecutivePresident.ImmediatePosition = counter + counterFat;
                counterFat++;
            } else {
                nonconsecutivePresident = null;
            }            
            if(president.HasNonconsecutiveTerms) {
                nonconsecutivePresidentBench = JSON.parse(JSON.stringify(president));
            } else {
                nonconsecutivePresidentBench = null;
            }
            output.push(president);
            if (nonconsecutivePresident){
                output.push(nonconsecutivePresident);
            }           
        });
        return output;
    }

    function MapPresidentToPresidentPlus(president:President):PresidentPlus{
        let presidentPlus:PresidentPlus = new PresidentPlus();
        presidentPlus.Name = president.Name;
        presidentPlus.Party = president.Party;
        presidentPlus.HasNonconsecutiveTerms = president.HasNonconsecutiveTerms;
        presidentPlus.IsCurrentPresident = false;
        return presidentPlus;
    }
}