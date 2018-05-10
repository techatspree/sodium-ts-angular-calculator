import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DigitButtonComponent } from './digit-button/digit-button.component';
import { DisplayFieldComponent } from './display-field/display-field.component';

@NgModule({
  declarations: [
    AppComponent,
    DigitButtonComponent,
    DisplayFieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
