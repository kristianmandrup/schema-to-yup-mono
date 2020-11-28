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

      describe("mixed", () => {
        it("returns mixed type instance", () => {
          expect(conv.mixed).toBe(handler);
        });
      });

      describe("type", () => {
        it("returns type of handler", () => {
          expect(conv.type).toBe(handler.type);
        });
      });

      describe("typeEnabled", () => {
        it("enabled constraints for the type", () => {
          expect(conv.typeEnabled).toBe(handler.typeEnabled);
        });
      });

      describe("convertMixed", () => {
        it("converts using mixed type instance", () => {
          expect(conv.convertMixed()).toBe(handler);
        });
      });

      describe("typeConfig", () => {
        it("returns type configuration", () => {
          expect(conv.typeConfig).toEqual({});
        });
      });

      describe("configuredTypeEnabled", () => {
        it("returns type enabled configuration", () => {
          expect(conv.configuredTypeEnabled).toEqual({});
        });
      });

      describe("enabled", () => {
        it("returns type constraints enabled", () => {
          expect(conv.enabled).toEqual([]);
        });
      });

      describe("constraintsProcessor", () => {
        it("returns type constraints processor", () => {
          expect(conv.constraintsProcessor).toEqual([]);
        });
      });

      describe("configureTypeConfig()", () => {
        it("configures type configuration with keys of custom constraints", () => {
          conv.configureTypeConfig();
          expect(conv.typeConfig.extends).toEqual([]);
        });
      });

      describe("calcTypeExtends()", () => {
        it("calculates type constraint extensions for custom constraints", () => {
          const extendKeys = conv.calcTypeExtends();
          expect(extendKeys).toEqual([]);
        });
      });

      describe("convertEnabled()", () => {
        it("converts instance to a new type instance using enabled type constraints", () => {
          const oldInst = conv.handler.instance;
          conv.convertEnabled();
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });

      describe("convert()", () => {
        it("converts instance to a new type instance via either custom or built-in named type constraints", () => {
          const oldInst = conv.handler.instance;
          conv.convert();
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });

      describe("addMappedConstraints()", () => {
        it("adds mapped constraints to create a new type instance", () => {
          const oldInst = conv.handler.instance;
          conv.addMappedConstraints();
          expect(conv.handler.instance).not.toBe(oldInst);
        });
      });

      describe("createConstraintsAdder(propertySchema, config);", () => {
        it("creates a ConstraintsAdder instance", () => {
          const instance = conv.createConstraintsAdder();
          expect(instance).toBe({});
        });
      });
    });
  });
});
