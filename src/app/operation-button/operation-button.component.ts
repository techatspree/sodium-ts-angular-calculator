import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-operation-button',
  templateUrl: './operation-button.component.html',
  styleUrls: ['./operation-button.component.css']
})
export class OperationButtonComponent implements OnInit {

  @Input() operationSymbol: string;
  @Input() clickF: () => void;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.clickF();
  }

}
