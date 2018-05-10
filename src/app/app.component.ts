import { Component } from '@angular/core';
import { Cell, StreamSink, Transaction } from 'sodiumjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  displayC : Cell<number>;

  ngOnInit() {
    console.log("Init Application");

    Transaction.run(() => {
      const digitClickS = new StreamSink<number>();
      this.displayC = digitClickS.hold(1234);
    });

  }


  title = 'Sodium Calculator';
}
