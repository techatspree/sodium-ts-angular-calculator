import {Component, Input, OnInit} from '@angular/core';
import {StreamSink, Unit, Stream} from 'sodiumjs';

@Component({
  selector: 'app-operation-button',
  templateUrl: './operation-button.component.html',
  styleUrls: ['./operation-button.component.css']
})
export class OperationButtonComponent {

  @Input() operationSymbol: string;

  private _stream = new StreamSink<Unit>();
  get stream(): Stream<Unit> {
    return this._stream;
  }

  // noinspection JSUnusedGlobalSymbols
  onClick() {
    this._stream.send(Unit.UNIT);
  }

}
