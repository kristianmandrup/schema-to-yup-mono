import { TypeValueProcessor } from "..";

const createTypeValueProcessor = (handler, config) => {
  return new TypeValueProcessor(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("TypeValueProcessor", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let tvp;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      tvp = createTypeValueProcessor(handler, config);
    });

    it("sets handler", () => {
      expect(tvp.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
