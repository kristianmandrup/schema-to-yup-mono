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
      describe("typeModeSelector", () => {
        it("returns type mode selector", () => {
          expect(tvp.typeModeSelector).toBe({});
        });
      });

      describe("mixed", () => {
        it("returns mixed type handler", () => {
          expect(tvp.mixed).toBe({});
        });
      });

      describe("shouldPreProcessValue", () => {
        it("is true", () => {
          expect(tvp.shouldPreProcessValue).toBe({});
        });
      });

      describe("value", () => {
        it("is x", () => {
          expect(tvp.value).toBe({});
        });
      });

      describe("disabledMode(mode)", () => {
        it("is x", () => {
          const mode = "x";
          expect(tvp.disabledMode(mode)).toBe({});
        });
      });

      describe("isRequired(value)", () => {
        it("is x", () => {
          const value = "x";
          expect(tvp.isRequired(value)).toBe({});
        });
      });

      describe("preProcessedConstraintValue(value)", () => {
        it("is x", () => {
          const value = "x";
          expect(tvp.preProcessedConstraintValue(value)).toBe({});
        });
      });

      describe("value(value)", () => {
        it("is x", () => {
          const value = "x";
          expect(tvp.value(value)).toBe({});
        });
      });
    });
  });
});
