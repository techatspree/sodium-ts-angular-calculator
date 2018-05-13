import {Component} from '@angular/core';
import {Cell, CellLoop, StreamSink, Transaction, Unit} from 'sodiumjs';
import {CalculatorState, Operator} from "./operator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayC: Cell<number>;

  private digitS: StreamSink<number> = new StreamSink();
  private operatorS: StreamSink<Operator> = new StreamSink();
  private computeS: StreamSink<Unit> = new StreamSink();

  clickDigit = (digit: number) => {
    console.log("clickDigit - " + digit);
    this.digitS.send(digit);
  };

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

    Transaction.run(() => {
      const statusC = new CellLoop<CalculatorState>();
      this.displayC = statusC.map(status => status.display);

      const updatedStateFromOperatorS = this.operatorS.snapshot(statusC,
        (op, status) => status.applyActiveOperatorAndSetOperator(op));

      const updatedStateFromCompute = this.computeS.snapshot(statusC,
        (u, status) => status.applyActiveOperatorAndSetOperator(Operator.None).resetMainAndback());

      const updatedEnteredNumberS = this.digitS.snapshot(
        statusC,
        (dig, status) => status.withDisplayAndMain(status.main * 10 + dig));

      const updatedStateS = updatedEnteredNumberS
        .orElse(updatedStateFromOperatorS)
        .orElse(updatedStateFromCompute);

      statusC.loop(
        updatedStateS.hold(
          new CalculatorState(0, 0, 0, Operator.None)));
    });
  }

  // noinspection JSUnusedGlobalSymbols
  title = 'Sodium Calculator';
}
