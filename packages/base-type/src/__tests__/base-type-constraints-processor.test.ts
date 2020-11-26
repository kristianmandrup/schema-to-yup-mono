import { BaseTypeConstraintsProcessor } from "..";

const createBaseTypeConstraintsProcessor = (config) => {
  return new BaseTypeConstraintsProcessor(config);
};

describe("BaseTypeConstraintsProcessor", () => {
  let config = {};

  describe("process(name)", () => {
    let btcp;
    beforeAll(() => {
      btcp = createBaseTypeConstraintsProcessor(config);
    });

    it("processes named constraint", () => {
      const oldTypeInstance = btcp.typeInstance;
      btcp.process(name);
      expect(btcp.typeInstance).not.toBe(oldTypeInstance);
    });
  });
});
