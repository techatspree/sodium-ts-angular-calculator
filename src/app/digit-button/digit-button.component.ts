import {Component, Input, OnInit} from '@angular/core';
import {Unit, Stream, StreamSink} from 'sodiumjs';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  private sClickedSink: StreamSink<Unit>;

  public sClicked: Stream<number>;

  @Input() digit : number;

  constructor() { }

  ngOnInit() {

  }

  onClick() {
    console.log("CLICK");
  }
}
