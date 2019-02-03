import { TestBed, fakeAsync, tick, async, ComponentFixture, inject } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalContract } from '../contracts/modal.contract';
import { ModalContractStub } from '../contracts/modal.contract.stub';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialContractStub } from '../contracts/presidential.contract.stub';

describe('IpComponent (shallow)', () => {
    let fixture: ComponentFixture<ModalComponent>;
    let component: ModalComponent;
    let element;

    beforeEach(() => {        
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                ModalComponent
            ],
            providers: [
                {provide: ModalContract, useValue: new ModalContractStub()}, {provide: PresidentialContract, useValue: new PresidentialContractStub()}
            ]
        });
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
    });

    describe('stage prep', ()=> {
        it('not nude ModalMetadata should trigger configuration for editing a president', fakeAsync(()=> {
                fixture.detectChanges();
                tick();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    fixture.detectChanges();
                    expect(element.querySelector('input').value).toContain('Grover Cleveland');
                });
        }));
    });
});