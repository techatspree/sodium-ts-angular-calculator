import {Component} from '@angular/core';
import {Cell, StreamSink, Transaction, CellLoop} from 'sodiumjs';
import {Operator, CalculatorState} from "./operator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayC: Cell<number>;

  private digitS: StreamSink<number> = new StreamSink();
  private operatorS: StreamSink<Operator> = new StreamSink();

  clickDigit = (digit: number) => {
    console.log("clickDigit - "+ digit);
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
  };

  // noinspection JSUnusedGlobalSymbols
  ngOnInit() {
    console.log("Init Application");

    Transaction.run(() => {
      const statusC = new CellLoop<CalculatorState>();
      this.displayC = statusC.map(status => status.display);

      const updatedStateFromOperatorS = this.operatorS.snapshot(statusC,
        (op,status) => status.applyActiveOperatorAndSetOperator(op));

      const updatedEnteredNumberS = this.digitS.snapshot(
        statusC,
        (dig, status) => status.withDisplayAndMain(status.main * 10 + dig));

      const updatedStateS = updatedEnteredNumberS.orElse(updatedStateFromOperatorS);

      statusC.loop(
        updatedStateS.hold(
          new CalculatorState(0,0,0, Operator.None)));
    });
  }

  title = 'Sodium Calculator';
}
