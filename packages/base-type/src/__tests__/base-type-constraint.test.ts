import { BaseTypeConstraint } from "..";

const createBaseTypeConstraint = (handler, propertySchema, config) => {
  return new BaseTypeConstraint(handler, propertySchema, config);
};

describe("BaseTypeConstraint", () => {
  let config = {};
  let handler = {};
  let propertySchema = {};

  describe("setTypeInstance(inst)", () => {
    let btc;
    beforeAll(() => {
      btc = createBaseTypeConstraint(handler, propertySchema, config);
    });

    it("sets typeInstance", () => {
      const inst = {
        x: 2,
      };
      btc.setTypeInstance(inst);
      expect(btc.typeInstance).toBe(inst);
    });
  });
});
