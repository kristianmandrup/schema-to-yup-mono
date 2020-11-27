import { TypeModeSelector } from "..";

const createTypeModeSelector = (handler, config) => {
  return new TypeModeSelector(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("TypeModeSelector", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let tms;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      tms = createTypeModeSelector(handler, config);
    });

    it("sets handler", () => {
      expect(tms.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
