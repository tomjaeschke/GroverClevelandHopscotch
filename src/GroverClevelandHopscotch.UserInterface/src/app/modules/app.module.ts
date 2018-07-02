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
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from '../layout/layout.component';
import { MenuComponent } from '../layout/menu.component';
import { HomeComponent } from '../components/home.component';
import { ListComponent } from '../components/list.component';
import { ReactiveFormsComponent } from '../components/reactiveForms.component';
import { SuperSimpleFormComponent } from '../components/superSimpleForm.component';
import { IpComponent } from '../components/ip.component';
import { IpContract } from '../contracts/ip.contract';
import { IpService } from '../services/ip.service';
import { ClockComponent } from '../components/clock.component';
import { TimeContract } from '../contracts/time.contract';
import { TimeService } from '../services/time.service';
import { Configuration } from '../../configuration';
import { routing } from './app.routing';
import { PresidentialContract } from '../contracts/presidential.contract';
import { PresidentialService } from '../services/presidential.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialsListComponent } from '../components/materialsList.component';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,  MatSortModule, MatTableModule } from "@angular/material";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    routing,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule 
  ],
  declarations: [
    LayoutComponent,
    MenuComponent,
    IpComponent,
    HomeComponent,
    ClockComponent,
    ListComponent,
    ReactiveFormsComponent,
    SuperSimpleFormComponent,
    MaterialsListComponent
  ],
  bootstrap: [ LayoutComponent ],
  providers: [ 
    Configuration,
    {provide: IpContract, useClass: IpService},
    {provide: TimeContract, useClass: TimeService},
    {provide: PresidentialContract, useClass: PresidentialService},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppModule {}