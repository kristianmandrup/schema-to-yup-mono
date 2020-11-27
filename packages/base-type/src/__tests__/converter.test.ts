import { Converter } from "..";

const createConverter = (handler, config) => {
  return new Converter(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("Converter", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let conv;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      conv = createConverter(handler, config);
    });

    it("sets handler", () => {
      expect(conv.handler).toBe(handler);
    });

    context("instance", () => {
      // ...
    });
  });
});
