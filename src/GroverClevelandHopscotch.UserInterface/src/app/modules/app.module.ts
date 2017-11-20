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
import { IpComponent } from '../components/ip.component';
import { IpContract } from '../contracts/ip.contract';
import { IpService } from '../services/ip.service';
import {Configuration} from '../../configuration';
import { routing } from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    LayoutComponent,
    IpComponent
  ],
  bootstrap: [ LayoutComponent ],
  providers: [ 
    Configuration,
    {provide: IpContract, useClass: IpService}
  ]
})
export class AppModule {}