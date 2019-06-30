import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { President } from '../models/president.model';
import { PresidentPlus } from '../models/presidentPlus.model';
import { PresidentialSorterModule } from './presidentialSorter.module';

describe('PresidentialSorterModule (isolated)', () => {
    let startingList: Array<President>;
    
    beforeEach(() => {  
        let groverCleveland:President = new President();
        groverCleveland.Name = "Grover Cleveland";
        groverCleveland.Party = "Democrat";
        groverCleveland.HasNonconsecutiveTerms = true;
        let benjaminHarrison:President = new President();
        benjaminHarrison.Name = "Benjamin Harrison";
        benjaminHarrison.Party = "Republican";
        benjaminHarrison.HasNonconsecutiveTerms = false;
        let williamMcKinley:President = new President();
        williamMcKinley.Name = "William McKinley";
        williamMcKinley.Party = "Republican";
        williamMcKinley.HasNonconsecutiveTerms = false;
        startingList = [groverCleveland,benjaminHarrison,williamMcKinley];
    });

    describe('Drag', ()=> {
        it('drag down should behave as expected', fakeAsync(()=> {
            let endList: Array<President> = PresidentialSorterModule.Drag(13, 2, "Grover Cleveland", startingList);
            expect(endList.length).toBe(3);
            expect(endList[0].Name).toBe("Benjamin Harrison");
            expect(endList[1].Name).toBe("Grover Cleveland");
            expect(endList[2].Name).toBe("William McKinley");
        }));

        it('drag up should behave as expected', fakeAsync(()=> {
            let endList: Array<President> = PresidentialSorterModule.Drag(-13, 2, "William McKinley", startingList);
            expect(endList.length).toBe(3);
            expect(endList[0].Name).toBe("Grover Cleveland");
            expect(endList[1].Name).toBe("William McKinley");
            expect(endList[2].Name).toBe("Benjamin Harrison");
        }));
    });

    describe('Sort', ()=> {
        it('simple sort should behave as expected', fakeAsync(()=> {
            let endList: Array<PresidentPlus> = PresidentialSorterModule.Sort(startingList);
            expect(endList.length).toBe(4);
            expect(endList[0].Name).toBe("Grover Cleveland");
            expect(endList[0].Party).toBe("Democrat");
            expect(endList[0].HasNonconsecutiveTerms).toBe(true);
            expect(endList[0].Positions.length).toBe(2);
            expect(endList[0].Positions[0]).toBe(1);
            expect(endList[0].Positions[1]).toBe(3);
            expect(endList[0].IsCurrentPresident).toBe(false);
            expect(endList[1].Name).toBe("Benjamin Harrison");
            expect(endList[1].Party).toBe("Republican");
            expect(endList[1].HasNonconsecutiveTerms).toBe(false);
            expect(endList[1].Positions.length).toBe(1);
            expect(endList[1].Positions[0]).toBe(2);
            expect(endList[1].IsCurrentPresident).toBe(false);
            expect(endList[2].Name).toBe("Grover Cleveland");
            expect(endList[2].Party).toBe("Democrat");
            expect(endList[2].HasNonconsecutiveTerms).toBe(true);
            expect(endList[2].Positions.length).toBe(2);
            expect(endList[2].Positions[0]).toBe(1);
            expect(endList[2].Positions[1]).toBe(3);
            expect(endList[2].IsCurrentPresident).toBe(false);
            expect(endList[3].Name).toBe("William McKinley");
            expect(endList[3].Party).toBe("Republican");
            expect(endList[3].HasNonconsecutiveTerms).toBe(false);
            expect(endList[3].Positions.length).toBe(1);
            expect(endList[3].Positions[0]).toBe(4);
            expect(endList[3].IsCurrentPresident).toBe(true);
        }));

        it('back to back nonconsecutiveness should behave as expected', fakeAsync(()=> {
            startingList[1].HasNonconsecutiveTerms = true;
            let endList: Array<PresidentPlus> = PresidentialSorterModule.Sort(startingList);
            expect(endList.length).toBe(5);
            expect(endList[0].Name).toBe("Grover Cleveland");
            expect(endList[0].Party).toBe("Democrat");
            expect(endList[0].HasNonconsecutiveTerms).toBe(true);
            expect(endList[0].Positions.length).toBe(2);
            expect(endList[0].Positions[0]).toBe(1);
            expect(endList[0].Positions[1]).toBe(3);
            expect(endList[0].IsCurrentPresident).toBe(false);
            expect(endList[1].Name).toBe("Benjamin Harrison");
            expect(endList[1].Party).toBe("Republican");
            expect(endList[1].HasNonconsecutiveTerms).toBe(true);
            expect(endList[1].Positions.length).toBe(2);
            expect(endList[1].Positions[0]).toBe(2);
            expect(endList[1].Positions[1]).toBe(4);
            expect(endList[1].IsCurrentPresident).toBe(false);
            expect(endList[2].Name).toBe("Grover Cleveland");
            expect(endList[2].Party).toBe("Democrat");
            expect(endList[2].HasNonconsecutiveTerms).toBe(true);
            expect(endList[2].Positions.length).toBe(2);
            expect(endList[2].Positions[0]).toBe(1);
            expect(endList[2].Positions[1]).toBe(3);
            expect(endList[2].IsCurrentPresident).toBe(false);
            expect(endList[3].Name).toBe("Benjamin Harrison");
            expect(endList[3].Party).toBe("Republican");
            expect(endList[3].HasNonconsecutiveTerms).toBe(true);
            expect(endList[3].Positions.length).toBe(2);
            expect(endList[3].Positions[0]).toBe(2);
            expect(endList[3].Positions[1]).toBe(4);
            expect(endList[3].IsCurrentPresident).toBe(false);
            expect(endList[4].Name).toBe("William McKinley");
            expect(endList[4].Party).toBe("Republican");
            expect(endList[4].HasNonconsecutiveTerms).toBe(false);
            expect(endList[4].Positions.length).toBe(1);
            expect(endList[4].Positions[0]).toBe(5);
            expect(endList[4].IsCurrentPresident).toBe(true);
        })); 
    });
});