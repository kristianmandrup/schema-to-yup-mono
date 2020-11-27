import { ConstraintBuilder } from "..";

const createConstraintBuilder = (handler, config) => {
  return new ConstraintBuilder(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("ConstraintBuilder", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let cb;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      cb = createConstraintBuilder(handler, config);
    });

    it("sets handler", () => {
      expect(cb.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
