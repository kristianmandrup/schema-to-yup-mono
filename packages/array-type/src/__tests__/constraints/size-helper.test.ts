import { constraints } from "..";
const { ArraySizeHelper } = constraints;

const createHelper = (config) => {
  return new ArraySizeHelper(config);
};

describe("ItemsOf: constraint", () => {
  let config = {};

  describe("isValidSize()", () => {
    let helper;
    beforeAll(() => {
      helper = createHelper(config);
    });

    it("compacts", () => {
      expect(helper.isValidSize(0)).toBeTruthy();
    });
  });
});
