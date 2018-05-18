import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Cell, Operational, Transaction} from 'sodiumjs';
import {DigitButtonComponent} from "./digit-button/digit-button.component";
import {DisplayFieldComponent} from "./display-field/display-field.component";
import {OperationButtonComponent} from "./operation-button/operation-button.component";


class DisplayFieldSpy extends DisplayFieldComponent {
  private _displayC: Cell<number>;

  set displayC(cell: Cell<number>) {
    this._displayC = cell;
  }

  get displayC(): Cell<number> {
    return this._displayC;
  }
}

class DigitTestComponent extends DigitButtonComponent {
  constructor(digit: number) {
    super();
    this.digit = digit;
  }
}

// The Tests
// =====================


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  const digit0Cp = new DigitTestComponent(0);
  const digit1Cp = new DigitTestComponent(1);
  const digit2Cp = new DigitTestComponent(2);
  const digit3Cp = new DigitTestComponent(3);
  const digit4Cp = new DigitTestComponent(4);
  const digit5Cp = new DigitTestComponent(5);
  const digit6Cp = new DigitTestComponent(6);
  const digit7Cp = new DigitTestComponent(7);
  const digit8Cp = new DigitTestComponent(8);
  const digit9Cp = new DigitTestComponent(9);

  const plusCp = new OperationButtonComponent();
  const minusCp = new OperationButtonComponent();
  const computeCp = new OperationButtonComponent();

  const displayCp = new DisplayFieldSpy();
  let lastDisplayValue: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);

        app = fixture.debugElement.componentInstance;
        app.digit0B = digit0Cp;
        app.digit1B = digit1Cp;
        app.digit2B = digit2Cp;
        app.digit3B = digit3Cp;
        app.digit4B = digit4Cp;
        app.digit5B = digit5Cp;
        app.digit6B = digit6Cp;
        app.digit7B = digit7Cp;
        app.digit8B = digit8Cp;
        app.digit9B = digit9Cp;
        app.plusB = plusCp;
        app.minusB = minusCp;
        app.computeB = computeCp;
        app.displayF = displayCp;

        app.ngAfterViewInit();

        Transaction.run(() => {
          Operational
            .value(displayCp.displayC)
            .listen(n => {
              console.log("new Cell value: " + n);
              lastDisplayValue = n;
            });
        });
      });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should display a 0 at startup', async(() => {
    expect(lastDisplayValue).toBe(0);
  }));

  it('should display a 123 after clicking the digits 1,2,3', async(() => {
    digit1Cp.onClick();
    digit2Cp.onClick();
    digit3Cp.onClick();
    expect(lastDisplayValue).toBe(123);
  }));

  it('should display a 12 after adding 10 and 2 and continue to add', async(() => {
    digit1Cp.onClick();
    digit0Cp.onClick();
    plusCp.onClick();
    digit2Cp.onClick();
    plusCp.onClick();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 12 after adding 10 and 2 press compute', async(() => {
    digit1Cp.onClick();
    digit0Cp.onClick();
    plusCp.onClick();
    digit2Cp.onClick();
    computeCp.onClick();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 15 after adding 10 and 2 and 3 ', async(() => {
    digit1Cp.onClick();
    digit0Cp.onClick();

    plusCp.onClick();

    digit2Cp.onClick();

    plusCp.onClick();

    digit3Cp.onClick();

    computeCp.onClick();
    expect(lastDisplayValue).toBe(15);
  }));

  it('should display a 8 after subtracting 2 from 10', async(() => {
    digit1Cp.onClick();
    digit0Cp.onClick();

    minusCp.onClick();

    digit2Cp.onClick();

    computeCp.onClick();

    expect(lastDisplayValue).toBe(8);
  }));

  it('should display a 12 after 10-2+4', async(() => {
    digit1Cp.onClick();
    digit0Cp.onClick();

    minusCp.onClick();

    digit2Cp.onClick();

    plusCp.onClick();

    digit4Cp.onClick();

    computeCp.onClick();

    expect(lastDisplayValue).toBe(12);
  }));
});
