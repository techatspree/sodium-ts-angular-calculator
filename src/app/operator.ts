export enum Operator {
  Plus,
  Minus,
  Compute,
  None
}

export class CalculatorState {
  readonly main: number;
  readonly back: number;
  readonly display: number;
  readonly activeOperator: Operator;

  constructor(main: number, back: number, display: number, activeOperator: Operator) {
    this.main = main;
    this.back = back;
    this.display = display;
    this.activeOperator = activeOperator;
  }

  withDisplay(newDisplay : number) : CalculatorState {
    return new CalculatorState(this.main, this.back, newDisplay, this.activeOperator);
  }


}

