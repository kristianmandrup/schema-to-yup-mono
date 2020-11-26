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

    it("sets typeInstance", () => {
      const inst = {
        x: 2,
      };
      bt.setTypeInstance(inst);
      expect(bt.typeInstance).toBe(inst);
    });
  });
});
