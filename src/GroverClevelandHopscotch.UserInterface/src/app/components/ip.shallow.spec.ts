import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { IpComponent } from './ip.component';
import { IpContract } from '../contracts/ip.contract';
import { IpContractStub } from '../contracts/ip.contract.stub';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

describe('IpComponent (shallow)', () => {
    let fixture: ComponentFixture<IpComponent>;
    let component: IpComponent;
    let element;

    beforeEach(() => {        
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                IpComponent
            ],
            providers: [
                {provide: IpContract, useValue: new IpContractStub()}
            ]
        });
        fixture = TestBed.createComponent(IpComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    describe('greeting', ()=> {
        it('should contain ip address', fakeAsync(()=> {

                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    expect(element.querySelector('section').textContent).toContain('Welcome 127.0.0.1 to Grover Cleveland Hopscotch!');
                });
        }));
    });
});