import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Cell, CellLoop, Stream, Transaction} from 'sodiumjs';
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
  @ViewChild('minus') minusB: OperationButtonComponent;
  @ViewChild('compute') computeB: OperationButtonComponent;


  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');

    let displayC: Cell<number>;

    Transaction.run(() => {
      const statusC = new CellLoop<CalculatorState>();

      displayC = statusC.map(status => status.display);

      const updatedEnteredNumberS = this.wireDigitStream(statusC);

      const updatedStateFromCompute = this.wireComputeStream(statusC);

      const plusS = this.plusB.stream.mapTo( Operator.Plus );

      const minusS: Stream<Operator> = this.minusB.stream.mapTo( Operator.Minus );

      const operatorS: Stream<Operator> = plusS.orElse(minusS);

      const updatedStateFromOperatorS = operatorS.snapshot(statusC,
        (op, status) => status.applyActiveOperatorAndSetOperator(op));

      const updatedStateS = updatedEnteredNumberS
        .orElse(updatedStateFromOperatorS)
        .orElse(updatedStateFromCompute);


      statusC.loop(
        updatedStateS.hold(
          new CalculatorState(0, 0, 0, Operator.None)));
    });

    this.displayF.displayC = displayC;
  }

  private wireDigitStream(statusC: Cell<CalculatorState>): Stream<CalculatorState> {
    const digitS = this.combineDigitStreams();
    const updatedEnteredNumberS = digitS.snapshot(
      statusC,
      (dig, status) => status.withDisplayAndMain(status.main * 10 + dig));
    return updatedEnteredNumberS;
  }

  private wireComputeStream(statusC: Cell<CalculatorState>): Stream<CalculatorState> {
    const updatedStateFromCompute = this.computeB.stream.snapshot(statusC,
      (u, status) => status.applyActiveOperatorAndSetOperator(Operator.None).resetMainAndback());
    return updatedStateFromCompute;
  }

  private wireOperatorStreams(statusC: Cell<CalculatorState>): Stream<CalculatorState> {
    console.log("a");
    const plusS: Stream<Operator> = this.plusB.stream.map((u => Operator.Plus));
    console.log("b");
    const minusS: Stream<Operator> = this.plusB.stream.map(u => Operator.Plus);
    console.log("c");
    const operatorS: Stream<Operator> = plusS.orElse(minusS);

    const updatedStateFromOperatorS = operatorS.snapshot(statusC,
      (op, status) => status.applyActiveOperatorAndSetOperator(op));
    return updatedStateFromOperatorS;
  }

  private combineDigitStreams(): Stream<number> {
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
