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

        context("valid", () => {
          it("does not throw error", () => {
            const value = "y";
            const opts = {};
            expect(() => bt.validateValue(value, opts)).toBeTruthy();
          });
        });
      });

      describe("constraintsAdder", () => {
        it("returns a constraintsAdder", () => {
          expect(bt.constraintsAdder).toEqual({});
        });
      });

      describe("validateOnCreate(key, value, opts);", () => {
        context("invalid", () => {
          it("throws error", () => {
            const key = "x";
            const value = {};
            const opts = {};
            expect(() => bt.validateOnCreate(key, value, opts)).toThrow();
          });
        });

        context("valid", () => {
          it("does not throw error", () => {
            const key = "x";
            const value = {};
            const opts = {};
            expect(bt.validateOnCreate(key, value, opts)).toBeTruthy();
          });
        });
      });

      describe("init()", () => {
        it("initializes", () => {
          expect(bt.init()).toEqual({});
        });
      });

      describe("configure()", () => {
        it("configures", () => {
          expect(bt.configure()).toEqual({});
        });
      });

      describe("constraintNameFor(...names)", () => {
        it("gets constraint name", () => {
          const names = ["x"];
          expect(bt.constraintNameFor(...names)).toEqual("xx");
        });
      });

      describe("initHelpers()", () => {
        it("initializes helpers", () => {
          bt.initHelpers();
          expect(bt.helper).toBeTruthy();
        });
      });

      describe("setClassMap()", () => {
        it("sets classMap", () => {
          bt.setClassMap();
          expect(bt.classMap).toEqual({});
        });
      });

      describe("getConstraints()", () => {
        it("gets constraints", () => {
          const constraints = bt.getConstraints();
          expect(constraints).toEqual({});
        });
      });

      describe("createConstraintsProcessor()", () => {
        it("gets constraints", () => {
          const cp = bt.createConstraintsProcessor();
          expect(cp).toEqual({});
        });
      });

      describe("createTypeValueProcessor()", () => {
        it("gets constraints", () => {
          const tvp = bt.createTypeValueProcessor();
          expect(tvp).toEqual({});
        });
      });

      describe("createTypeModeSelector()", () => {
        it("gets constraints", () => {
          const tms = bt.createTypeModeSelector();
          expect(tms).toEqual({});
        });
      });

      describe("createTypeErrorHandler()", () => {
        it("gets constraints", () => {
          const teh = bt.createTypeErrorHandler();
          expect(teh).toEqual({});
        });
      });

      describe("convert()", () => {
        it("gets constraints", () => {
          bt.convert();
          expect(bt.instance).toEqual({});
        });
      });

      describe("createConverter()", () => {
        it("creates converter", () => {
          const conv = bt.createConverter();
          expect(conv).toEqual({});
        });
      });

      describe("createConverter()", () => {
        it("creates converter", () => {
          const conv = bt.createConverter();
          expect(conv).toEqual({});
        });
      });

      describe("createSchemaEntry()", () => {
        it("creates schema entry", () => {
          const entry = bt.createSchemaEntry();
          expect(entry).toEqual({});
        });
      });

      describe("createMixed()", () => {
        it("creates schema entry", () => {
          const mixed = bt.createMixed();
          expect(mixed).toEqual({});
        });
      });
    });
  });
});
