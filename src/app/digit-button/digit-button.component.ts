import {Component, Input, AfterViewInit} from '@angular/core';
import {StreamSink, Stream } from 'sodiumjs';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements AfterViewInit {

  @Input() digit: number;

  private streamSink: StreamSink<number> = new StreamSink<number>();
  get stream(): Stream<number> {
    return this.streamSink;
  }

  onClick() {
    this.streamSink.send(this.digit);
  }

  ngOnInit() {
    console.log("ngOnInit() - DigitButtonComponent");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit() - DigitButtonComponent");
  }
}
