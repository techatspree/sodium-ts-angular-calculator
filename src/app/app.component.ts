import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Cell, CellLoop, StreamSink, Transaction, Unit} from 'sodiumjs';
import {CalculatorState, Operator} from "./operator";
import {DigitButtonComponent} from "./digit-button/digit-button.component";
import {DisplayFieldComponent} from "./display-field/display-field.component";
import {OperationButtonComponent} from "./operation-button/operation-button.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('digit1') digit1B: DigitButtonComponent;
  @ViewChild('digit2') digit2B: DigitButtonComponent;
  @ViewChild('digit3') digit3B: DigitButtonComponent;
  @ViewChild('digit4') digit4B: DigitButtonComponent;
  @ViewChild('digit5') digit5B: DigitButtonComponent;
  @ViewChild('digit6') digit6B: DigitButtonComponent;
  @ViewChild('digit7') digit7B: DigitButtonComponent;
  @ViewChild('digit8') digit8B: DigitButtonComponent;
  @ViewChild('digit9') digit9B: DigitButtonComponent;
  @ViewChild('digit0') digit0B: DigitButtonComponent;
  @ViewChild('display') displayF: DisplayFieldComponent;
  @ViewChild('plus') plusB: OperationButtonComponent;

  displayC: Cell<number>;

  private operatorS: StreamSink<Operator> = new StreamSink();
  private computeS: StreamSink<Unit> = new StreamSink();

  constructor() {
    console.log("Constructor of AppComponent");
    console.log(Transaction.currentTransaction);
  }

  // noinspection JSUnusedLocalSymbols
  clickPlus = () => {
    console.log("+ clicked");
    this.operatorS.send(Operator.Plus);
  };

  // noinspection JSUnusedLocalSymbols
  clickMinus = () => {
    console.log("- clicked");
    this.operatorS.send(Operator.Minus);
  };

  // noinspection JSUnusedLocalSymbols
  clickCompute = () => {
    console.log("= clicked");
    this.computeS.send(Unit.UNIT);
  };


  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    console.log("Init Application");

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');


    Transaction.run(() => {
      const statusC = new CellLoop<CalculatorState>();
      this.displayC = statusC.map(status => status.display);

      const updatedStateFromOperatorS = this.operatorS.snapshot(statusC,
        (op, status) => status.applyActiveOperatorAndSetOperator(op));

      const updatedStateFromCompute = this.computeS.snapshot(statusC,
        (u, status) => status.applyActiveOperatorAndSetOperator(Operator.None).resetMainAndback());


      const digitS = this.combineDigitStreams();

      const updatedEnteredNumberS = digitS.snapshot(
        statusC,
        (dig, status) => status.withDisplayAndMain(status.main * 10 + dig));

      const updatedStateS = updatedEnteredNumberS
        .orElse(updatedStateFromOperatorS)
        .orElse(updatedStateFromCompute);

      statusC.loop(
        updatedStateS.hold(
          new CalculatorState(0, 0, 0, Operator.None)));
    });
    this.displayF.displayC = this.displayC;
  }

  private combineDigitStreams() {
    return this.digit0B.stream
      .orElse(this.digit1B.stream)
      .orElse(this.digit2B.stream)
      .orElse(this.digit3B.stream)
      .orElse(this.digit4B.stream)
      .orElse(this.digit5B.stream)
      .orElse(this.digit6B.stream)
      .orElse(this.digit7B.stream)
      .orElse(this.digit8B.stream)
      .orElse(this.digit9B.stream)
      .orElse(this.digit0B.stream);
  }

// noinspection JSUnusedGlobalSymbols
  title = 'Sodium Calculator';
}
