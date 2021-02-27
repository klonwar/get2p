export class Module<Input = undefined, Output = void> {
  logic: (payload: Input) => Output;

  constructor(logic: (payload: Input) => Output) {
    this.logic = logic;
  }
}

// todo module logic