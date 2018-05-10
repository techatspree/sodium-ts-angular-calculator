import { Component } from '@angular/core';
import { Cell, StreamSink, Transaction } from 'sodiumjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayC : Cell<number>;

  private digitS : StreamSink<number> = new StreamSink();

  // noinspection JSUnusedLocalSymbols
  private clickDigit = (digit : number) => {
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
      this.displayC = this.digitS.hold(1234);
    });
  }

  title = 'Sodium Calculator';
}
