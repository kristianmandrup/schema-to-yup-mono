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
      describe("key", () => {
        it("returns key", () => {
          expect(cb.key).toBe({});
        });
      });

      describe("constraints", () => {
        it("returns constraints", () => {
          expect(cb.constraints).toBe({});
        });
      });

      describe("errorMessageHandler", () => {
        it("returns error message handler", () => {
          expect(cb.errorMessageHandler).toBe({});
        });
      });

      describe("errMessages", () => {
        it("returns err messages map", () => {
          expect(cb.errMessages).toBe({});
        });
      });

      describe("instance", () => {
        it("returns type instance", () => {
          expect(cb.instance).toBe({});
        });
      });

      describe("setInstance(inst)", () => {
        it("sets type instance", () => {
          const inst = {};
          expect(cb.setInstance(inst)).toBe({});
        });
      });
    });
  });
});
