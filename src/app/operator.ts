export enum Operator {
  Plus,
  Minus,
  Compute,
  None
}

export class CalculatorState {

  constructor(readonly main: number,
     readonly back: number, readonly display: number, readonly activeOperator: Operator) {
  }

  applyActiveOperatorAndSetOperator(op: Operator) {
    return this
      .applyAndSet(this.activeOperator, op);
  }

  applyAndSet(op: Operator, newOp: Operator): CalculatorState {
    return (op === Operator.None)
      ? applyNone(this, newOp)
      : (op === Operator.Compute)
        ? applyCompute(this, newOp)
        : (op === Operator.Plus)
          ? applyPlus(this, newOp)
          : (op === Operator.Minus)
            ? applyMinus(this, newOp)
            : null; // should throw an exception or something like this...
  }

  applyFunctionShowResultSetNewOperator(f: (main: number, back: number) => number, newOp: Operator): CalculatorState {
      const result = f(this.main, this.back);
      return new CalculatorState(0, result, result, newOp);
  }

  // noinspection JSUnusedGlobalSymbols
  withOperator(op: Operator): CalculatorState {
    return new CalculatorState(this.main, this.back, this.display, op);
  }

  withDisplayAndMain(value: number): CalculatorState {
    return new CalculatorState(value, this.back, value, this.activeOperator);
  }

  // noinspection JSUnusedGlobalSymbols
  withDisplay(newDisplay: number): CalculatorState {
    return new CalculatorState(this.main, this.back, newDisplay, this.activeOperator);
  }

  resetMainAndback(): CalculatorState {
    return new CalculatorState(0, 0, this.display, this.activeOperator);
  }
}

// this could be private methods, hm, or the logic in the class above could be removed from the class...

function applyPlus(s: CalculatorState, newOp: Operator): CalculatorState {
  return s.applyFunctionShowResultSetNewOperator((m, b) => m + b , newOp);
}

function applyMinus(s: CalculatorState, newOp: Operator): CalculatorState {
  return s.applyFunctionShowResultSetNewOperator( (m, b) => b - m, newOp);
}

// noinspection JSUnusedLocalSymbols
function applyCompute(s: CalculatorState, newOp: Operator): CalculatorState {
  return s;
}

function applyNone(s: CalculatorState, newOp: Operator): CalculatorState {
  // noinspection JSUnusedLocalSymbols
  return s.applyFunctionShowResultSetNewOperator( (m, b) => m, newOp);
}
