import { BaseTypeConstraint } from "..";

const createBaseTypeConstraint = (config) => {
  return new BaseTypeConstraint(config);
};

describe("BaseTypeConstraint", () => {
  let config = {};

  describe("setTypeInstance(inst)", () => {
    let btc;
    beforeAll(() => {
      btc = createBaseTypeConstraint(config);
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
