import { TypeErrorHandler } from "..";

const createTypeErrorHandler = (handler, config) => {
  return new TypeErrorHandler(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("TypeErrorHandler", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let teh;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      teh = createTypeErrorHandler(handler, config);
    });

    it("sets handler", () => {
      expect(teh.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
