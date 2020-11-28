import { TypeErrorHandler } from "..";

const createTypeErrorHandler = (handler, config) => {
  return new TypeErrorHandler(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("TypeErrorHandler", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let teh;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      teh = createTypeErrorHandler(handler, config);
    });

    it("sets handler", () => {
      expect(teh.handler).toBe(handler);
    });

    context("instance", () => {
      describe("key", () => {
        it("returns key of handler", () => {
          expect(teh.key).toBe(handler.key);
        });
      });

      describe("type", () => {
        it("returns type of handler", () => {
          expect(teh.type).toBe(handler.type);
        });
      });

      describe("createErrorMessageHandler(typeHandler, config)", () => {
        it("creates Error Message Handler", () => {
          const emh = teh.createErrorMessageHandler(handler, config);
          expect(emh).toBe(emh);
        });
      });

      describe("valErrMessage(msgName)", () => {
        it("creates Error Message Handler", () => {
          const errMsg = teh.valErrMessage("my-msg");
          expect(errMsg).toEqual("x");
        });
      });

      describe("valErrMessageOr(msgNames)", () => {
        it("creates Error Message Handler", () => {
          const errMsg = teh.valErrMessageOr(...["x", "xx"]);
          expect(errMsg).toEqual("x");
        });
      });

      describe("messageMap", () => {
        it("returns messageMap", () => {
          const map = teh.messageMap;
          expect(map).toEqual({});
        });
      });

      describe("errMessage(errKey)", () => {
        it("returns err message", () => {
          const errKey = "";
          const msg = teh.errMessage(errKey);
          expect(msg).toEqual("xx");
        });
      });

      describe("errorMsg(msg)", () => {
        it("returns an error message", () => {
          const msg = "x";
          const errMsg = teh.errorMsg(msg);
          expect(errMsg).toEqual("xx");
        });
      });

      describe("error(name, msg)", () => {
        it("returns an error message for name", () => {
          const msg = "x";
          const errMsg = teh.error(name, msg);
          expect(errMsg).toEqual("xx");
        });
      });

      describe("error(name, msg)", () => {
        it("returns an error message for name", () => {
          const msg = "x";
          expect(() => teh.throwError(msg)).toThrow();
        });
      });
    });
  });
});
