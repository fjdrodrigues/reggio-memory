import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { SharedModule } from '../components/shared/shared.module';

@NgModule({
    imports: [
      BrowserModule,
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      NgSelectModule,
      MatMomentDateModule,
      BrowserAnimationsModule,
      NgbDropdownModule,
      SharedModule,
    ],
    declarations: [
      AppNavbarComponent
    ],
    exports: [
      AppNavbarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class LayoutModule { }