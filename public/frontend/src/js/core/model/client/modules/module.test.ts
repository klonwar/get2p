import {Module} from "#src/js/core/model/client/modules/module";


describe(`Module`, () => {
  test(`Module logic works`, () => {
    const module1 = new Module<string, string>((data) => `Hello, ${data}`);

    expect(module1.logic(`world`)).toBe(`Hello, world`);
  });
});

