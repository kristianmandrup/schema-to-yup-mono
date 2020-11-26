import { constraints } from "..";
const { EnsureItems } = constraints;

const createHandler = () => {
  return {};
};

const createConstraint = (handler, opts) => new EnsureItems(handler, opts);

describe("EnsureItems: constraint", () => {
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
