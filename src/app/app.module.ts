import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DigitButtonComponent } from './digit-button/digit-button.component';
import { DisplayFieldComponent } from './display-field/display-field.component';
import { OperationButtonComponent } from './operation-button/operation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitButtonComponent,
    DisplayFieldComponent,
    OperationButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
