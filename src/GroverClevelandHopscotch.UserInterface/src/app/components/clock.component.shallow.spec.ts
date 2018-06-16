import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { ClockComponent } from './clock.component';
import { TimeContract } from '../contracts/time.contract';
import { TimeContractStub } from '../contracts/time.contract.stub';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('ClockComponent (shallow)', () => {
    let fixture: ComponentFixture<ClockComponent>;
    let component: ClockComponent;
    let element;

    beforeEach(() => {        
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                ClockComponent
            ],
            providers: [
                {provide: TimeContract, useValue: new TimeContractStub()}
            ]
        });
        fixture = TestBed.createComponent(ClockComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    describe('greeting', ()=> {
        it('should contain time', fakeAsync(()=> {

                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    expect(element.querySelector('li').textContent).toContain('The universal/Greenwich time is 19 past 9 in the post meridiem on November, 26th of 2017 currently.');
                });
        }));
    });
});