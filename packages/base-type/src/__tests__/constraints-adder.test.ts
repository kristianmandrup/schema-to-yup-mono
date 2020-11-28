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
    let ca;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      ca = createConstraintsAdder(handler, config);
    });

    it("sets handler", () => {
      expect(ca.handler).toBe(handler);
    });

    context("instance", () => {
      let ca;
      let config = {};
      beforeAll(() => {
        handler = createTypeHandler(obj, config);
        ca = createConstraintsAdder(handler, config);
      });

      describe("value", () => {
        it("returns type value", () => {
          expect(ca.value).toBe(handler.value);
        });
      });

      describe("setInstance", () => {
        it("sets type instance", () => {
          const instance = {};
          ca.setInstance(instance);
          expect(ca.handler.instance).toBe(instance);
        });
      });

      describe("getConstraints", () => {
        it("get constraints from config", () => {
          expect(ca.getConstraints()).toBe({});
        });
      });

      describe("createConstraintBuilder(ca, config)", () => {
        it("creates constraint builder", () => {
          ca.createConstraintBuilder(ca, config);
          expect(ca.getConstraints()).toBe({});
        });
      });

      describe("buildConstraintBuilder()", () => {
        it("build constraint builder", () => {
          ca.buildConstraintBuilder();
          expect(ca.buildConstraintBuilder()).toBe({});
        });
      });
    });
  });
});
