import { ConstraintsAdder } from "..";

const createConstraintsAdder = (handler, config) => {
  return new ConstraintsAdder(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("ConstraintsAdder", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let cb;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      cb = createConstraintsAdder(handler, config);
    });

    it("sets handler", () => {
      expect(cb.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
