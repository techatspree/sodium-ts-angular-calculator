import {Component} from '@angular/core';
import {Cell, StreamSink, Transaction, CellLoop} from 'sodiumjs';
import {Operator} from "./operator";


class CalculatorState {
  readonly main: number;
  readonly back: number;
  readonly display: number;
  readonly activeOperator: Operator;

  constructor(main: number, back: number, display: number, activeOperator: Operator) {
    this.main = main;
    this.back = back;
    this.display = display;
    this.activeOperator = activeOperator;
  }

  public withDisplay(newDisplay : number) : CalculatorState {
    return new CalculatorState(this.main, this.back, newDisplay, this.activeOperator);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayC: Cell<number>;

  private digitS: StreamSink<number> = new StreamSink();

  // noinspection JSUnusedLocalSymbols
  private clickDigit = (digit: number) => {
    console.log("clickDigit - "+ digit);
    this.digitS.send(digit);
  };

  // noinspection JSUnusedLocalSymbols
  private clickPlus = () => {
    console.log("+ clicked");
  };

  // noinspection JSUnusedLocalSymbols
  private clickMinus = () => {
    console.log("- clicked");
  };

  // noinspection JSUnusedLocalSymbols
  private clickCompute = () => {
    console.log("= clicked");
  };

  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    console.log("Init Application");

    Transaction.run(() => {
      let statusLoop = new CellLoop<CalculatorState>();
      this.displayC = statusLoop.map(status => status.display);

      let updatedEnteredNumberS = this.digitS.snapshot(
        statusLoop,
        (dig, status) => status.withDisplay(status.display * 10 + dig));

      statusLoop.loop(
        updatedEnteredNumberS.hold(
          new CalculatorState(0,0,0, Operator.None)));
    });
  }

  title = 'Sodium Calculator';
}
