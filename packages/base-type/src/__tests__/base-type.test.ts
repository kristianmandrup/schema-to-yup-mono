import { BaseType } from "..";

const createBaseType = (obj, config) => {
  return new BaseType(obj, config);
};

describe("BaseType", () => {
  let config = {};
  let obj = {};

  describe("setTypeInstance(inst)", () => {
    let bt;
    beforeAll(() => {
      bt = createBaseType(obj, config);
    });

    context("instance", () => {
      describe("types", () => {
        it("returns type handler map", () => {
          expect(bt.types).toEqual({});
        });
      });

      describe("typeName", () => {
        it("returns mixed", () => {
          expect(bt.typeName).toEqual("mixed");
        });
      });

      describe("mixedType", () => {
        it("returns mixed type handler", () => {
          expect(bt.mixedType).toEqual({});
        });
      });

      it("sets typeInstance", () => {
        const inst = {
          x: 2,
        };
        bt.setTypeInstance(inst);
        expect(bt.typeInstance).toBe(inst);
      });

      describe("chain(cb)", () => {
        it("returns mixed type handler", () => {
          const oldInst = bt.instance;
          bt.chain((x) => x.max(2));
          expect(bt.instance).not.toBe(oldInst);
        });
      });

      describe("chain(cb)", () => {
        it("returns mixed type handler", () => {
          const oldInst = bt.instance;
          bt.chain((x) => x.max(2));
          expect(bt.instance).not.toBe(oldInst);
        });
      });

      describe("setInstType(name)", () => {
        it("returns mixed type handler", () => {
          const oldInst = bt.instance;
          bt.setInstType(name);
          expect(bt.instance).not.toBe(oldInst);
        });
      });

      describe("valErrMessage(msgName)", () => {
        it("returns mixed type handler", () => {
          const msgName = "x";
          expect(bt.valErrMessage(msgName)).toEqual("x");
        });
      });

      describe("valErrMessageOr(...msgNames)", () => {
        it("returns mixed type handler", () => {
          expect(bt.valErrMessageOr(["x"])).toEqual("x");
        });
      });

      describe("addConstraint(alias, opts)", () => {
        it("adds constraint", () => {
          const alias = "x";
          const opts = {};
          expect(bt.addConstraint(alias, opts)).toEqual("x");
        });
      });

      describe("validateKey(key, opts)", () => {
        context("invalid", () => {
          it("throws error", () => {
            const key = "x";
            const opts = {};
            expect(() => bt.validateKey(key, opts)).toThrow();
          });
        });
      });

      describe("validateValue(value, opts)", () => {
        context("invalid", () => {
          it("throws error", () => {
            const value = "x";
            const opts = {};
            expect(() => bt.validateValue(value, opts)).toThrow();
          });
        });
      });

      // constraintsAdder;
      // validateOnCreate(key, value, opts);
      // init();
      // configure();
      // constraintNameFor(...names);
      // initHelpers();
      // setClassMap();
      // getConstraints();
      // createConstraintsProcessor();
      // createTypeValueProcessor();
      // createTypeModeSelector();
      // createTypeErrorHandler();
      // convert();
      // createSchemaEntry();
      // createConverter();
      // createMixed();
    });
  });
});
