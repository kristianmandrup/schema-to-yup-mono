import { constraints } from "..";
const { MaxItems } = constraints;

const createHandler = () => {
  return {};
};

const createConstraint = (handler, opts) => new MaxItems(handler, opts);

describe("MaxItems: constraint", () => {
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
