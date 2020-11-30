import { BaseTypeConstraint } from "..";

const createBaseTypeConstraint = (handler, propertySchema, config) => {
  return new BaseTypeConstraint(handler, propertySchema, config);
};

describe("BaseTypeConstraint", () => {
  let config = {};
  let handler: any = {};
  let propertySchema = {};
  let btc;
  beforeAll(() => {
    btc = createBaseTypeConstraint(handler, propertySchema, config);
  });

  context("instance", () => {
    describe("setTypeInstance(inst)", () => {
      it("sets typeInstance", () => {
        const inst = {
          x: 2,
        };
        btc.setTypeInstance(inst);
        expect(btc.typeInstance).toBe(inst);
      });
    });

    describe("errorHandler", () => {
      it("returns error handles", () => {
        expect(btc.errorHandler).toBe(handler.errorHandler);
      });
    });

    describe("yup", () => {
      it("returns yup", () => {
        expect(btc.yup).toBe(handler.yup);
      });
    });

    describe("type", () => {
      it("returns type", () => {
        expect(btc.type).toBe(handler.type);
      });
    });

    describe("value", () => {
      it("returns value", () => {
        expect(btc.value).toBe(handler.value);
      });
    });

    describe("key", () => {
      it("returns key", () => {
        expect(btc.key).toBe(handler.key);
      });
    });

    describe("format", () => {
      it("returns format", () => {
        expect(btc.format).toBe(handler.format);
      });
    });

    describe("constraints", () => {
      it("returns constraints", () => {
        expect(btc.constraints).toBe(handler.constraints);
      });
    });

    describe("constraintNameFor(...names)", () => {
      it("returns constraints", () => {
        const names = ["x", "y"];
        expect(btc.constraintNameFor(...names)).toEqual("x");
      });
    });

    describe("constraintNameFor(...names)", () => {
      it("returns constraints", (done) => {
        const names = ["x", "y"];
        const y = 2;
        btc.chain(
          (x) => (x = y),
          () => {
            expect(btc.instance).toBe(y);
            done();
          }
        );
      });
    });

    describe("valErrMessage(msg)", () => {
      it("returns constraints", () => {
        const msg = "x";
        expect(btc.valErrMessage(msg)).toEqual("x");
      });
    });

    describe("valErrMessageOr(...msgNames)", () => {
      it("returns constraints", () => {
        const msgNames = ["x", "y"];
        expect(btc.valErrMessageOr(...msgNames)).toEqual("x");
      });
    });

    describe("addConstraint(name)", () => {
      it("returns constraints", () => {
        const name = "x";
        const oldInst = btc.instance;
        btc.addConstraint(name);
        expect(btc.instance).not.toBe(oldInst);
      });
    });
  });
});
