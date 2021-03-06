import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, RouterLinkWithHref } from '@angular/router';

import { HomeComponent }  from '../components/home.component';
import { ListComponent }  from '../components/list.component';
import { ReactiveFormsComponent } from '../components/reactiveForms.component';
import { SuperSimpleFormComponent } from '../components/superSimpleForm.component';
import { StoreExampleComponent } from '../components/storeExample.component';
import { MaterialsListComponent } from '../components/materialsList.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'reactive',
    component: ReactiveFormsComponent
  },
  {
    path: 'simple',
    component: SuperSimpleFormComponent
  },
  {
    path: 'store',
    component: StoreExampleComponent
  },
  {
    path: 'materials-list',
    component: MaterialsListComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
