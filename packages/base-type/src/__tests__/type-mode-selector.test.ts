import { TypeModeSelector } from "..";

const createTypeModeSelector = (handler, config) => {
  return new TypeModeSelector(handler, config);
};

const createTypeHandler = (obj, config) => {
  return {};
};

describe("TypeModeSelector", () => {
  let config = {};
  let obj = {};
  let handler;

  describe("create", () => {
    let tms;
    beforeAll(() => {
      handler = createTypeHandler(obj, config);
      tms = createTypeModeSelector(handler, config);
    });

    it("sets handler", () => {
      expect(tms.handler).toBe(handler);
    });

    context("instance", () => {
      describe("mode", () => {
        it("returns mode", () => {
          expect(tms.mode).toEqual("x");
        });
      });

      describe("disableFlags", () => {
        it("returns disable flags", () => {
          expect(tms.disableFlags).toEqual(["x"]);
        });
      });

      describe("enableFlags", () => {
        it("returns enable flags", () => {
          expect(tms.enableFlags).toEqual(["x"]);
        });
      });

      describe("disabledMode(modeName)", () => {
        it("returns enable flags", () => {
          expect(tms.disabledMode("x")).toBeTruthy();
        });
      });

      describe("enabledMode(modeName)", () => {
        it("returns enable flags", () => {
          expect(tms.enabledMode("x")).toBeTruthy();
        });
      });
    });
  });
});
