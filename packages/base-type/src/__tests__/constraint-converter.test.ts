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
      describe("customConvertFor(name)", () => {
        it("converts instance to a new type instance via a custom named type constraint", () => {
          const oldInst = conv.handler.instance;
          conv.customConvertFor("custom");
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });

      describe("builtInConvertFor(name)", () => {
        it("converts instance to a new type instance via a built-in named type constraint", () => {
          const oldInst = conv.handler.instance;
          conv.builtInConvertFor("custom");
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });

      describe("convert()", () => {
        it("converts instance to a new type instance via either a custom or built-in named type constraint", () => {
          const oldInst = conv.handler.instance;
          conv.convert();
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });
    });
  });
});
