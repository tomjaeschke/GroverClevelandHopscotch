import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ClockComponent } from './clock.component';
import { TimeContract } from '../contracts/time.contract';
import { TimeContractStub } from '../contracts/time.contract.stub';
import { IpComponent } from './ip.component';
import { IpContract } from '../contracts/ip.contract';
import { IpContractStub } from '../contracts/ip.contract.stub';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

describe('HomeComponent (deep)', () => {
    let fixture: ComponentFixture<HomeComponent>;
    let component: HomeComponent;
    let element;

    beforeEach(() => {        
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                HomeComponent,
                IpComponent,
                ClockComponent
            ],
            providers: [
                {provide: TimeContract, useValue: new TimeContractStub()},
                {provide: IpContract, useValue: new IpContractStub()}
            ]
        });
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    describe('greeting', ()=> {
        it('should contain ip address and time', fakeAsync(()=> {

                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    expect(element.querySelectorAll('li')[0].textContent).toContain('Welcome 127.0.0.1, to Grover Cleveland Hopscotch!');
                    expect(element.querySelectorAll('li')[1].textContent).toContain('The universal/Greenwich time is 19 past 9 in the post meridiem on November, 26th of 2017 currently.');
                });
        }));
    });
});