import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {DigitButtonComponent} from './digit-button/digit-button.component';
import {OperationButtonComponent} from './operation-button/operation-button.component';
import {DisplayFieldComponent} from './display-field/display-field.component';

describe('AppComponent', () => {
  let lastDisplayValue: number;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:  [
        AppComponent,
        DigitButtonComponent,
        OperationButtonComponent,
        DisplayFieldComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        app = fixture.debugElement.componentInstance;
        app.displayF.display.subscribe(n => { lastDisplayValue = n; });
      });
  }));


  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should display a 0 at startup', async(() => {
    expect(lastDisplayValue).toBe(0);
  }));

  it('should display a 123 after clicking the digits 1,2,3', async(() => {
    app.digit1B.onClick();
    app.digit2B.onClick();
    app.digit3B.onClick();
    expect(lastDisplayValue).toBe(123);
  }));

  it('should display a 12 after adding 10 and 2 and continue to add', async(() => {
    app.digit1B.onClick();
    app.digit0B.onClick();
    app.plusB.onClick();
    app.digit2B.onClick();
    app.plusB.onClick();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 12 after adding 10 and 2 press compute', async(() => {
    app.digit1B.onClick();
    app.digit0B.onClick();
    app.plusB.onClick();
    app.digit2B.onClick();
    app.computeB.onClick();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 15 after adding 10 and 2 and 3 ', async(() => {
    app.digit1B.onClick();
    app.digit0B.onClick();
    app.plusB.onClick();
    app.digit2B.onClick();
    app.plusB.onClick();
    app.digit3B.onClick();
    app.computeB.onClick();
    expect(lastDisplayValue).toBe(15);
  }));

  it('should display a 8 after subtracting 2 from 10', async(() => {
    app.digit1B.onClick();
    app.digit0B.onClick();
    app.minusB.onClick();
    app.digit2B.onClick();
    app.computeB.onClick();
    expect(lastDisplayValue).toBe(8);
  }));

  it('should display a 12 after 10-2+4', async(() => {
    app.digit1B.onClick();
    app.digit0B.onClick();
    app.minusB.onClick();
    app.digit2B.onClick();
    app.plusB.onClick();
    app.digit4B.onClick();
    app.computeB.onClick();
    expect(lastDisplayValue).toBe(12);
  }));

});
