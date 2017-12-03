import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { LayoutComponent } from '../layout/layout.component';
import { HomeComponent } from '../components/home.component';
import { ListComponent } from '../components/list.component';
import { IpComponent } from '../components/ip.component';
import { IpContract } from '../contracts/ip.contract';
import { IpService } from '../services/ip.service';
import { ClockComponent } from '../components/clock.component';
import { TimeContract } from '../contracts/time.contract';
import { TimeService } from '../services/time.service';
import {Configuration} from '../../configuration';
import { routing } from './app.routing';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialService } from '../services/presidential.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    LayoutComponent,
    IpComponent,
    HomeComponent,
    ClockComponent,
    ListComponent
  ],
  bootstrap: [ LayoutComponent ],
  providers: [ 
    Configuration,
    {provide: IpContract, useClass: IpService},
    {provide: TimeContract, useClass: TimeService},
    {provide: PresidentialContract, useClass: PresidentialService}
  ]
})
export class AppModule {}