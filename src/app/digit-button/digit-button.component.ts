import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  @Input() digit: number;
  @Input() clickF: (dig: number) => void;

  constructor() {
  }

  ngOnInit() {
    console.log("Init  " + this.digit);
  }

  // noinspection JSUnusedGlobalSymbols
  ngAfterViewInit() {
    console.log("Init after view init " + this.digit);
  }

  onClick() {
    this.clickF(this.digit);
  }
}
