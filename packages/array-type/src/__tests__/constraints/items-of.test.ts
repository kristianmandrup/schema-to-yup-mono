import { constraints } from "..";
const { ItemsOf } = constraints;

const createHandler = () => {
  return {};
};

const createConstraint = (handler, opts) => new ItemsOf(handler, opts);

describe("ItemsOf: constraint", () => {
  let handler;

  describe("process()", () => {
    let constraint;
    const opts = {};

    beforeAll(() => {
      handler = createHandler();
      constraint = createConstraint(handler, opts);
      constraint.process();
    });
    it("compacts", () => {
      expect(constraint.instance).toEqual({});
    });
  });
});
