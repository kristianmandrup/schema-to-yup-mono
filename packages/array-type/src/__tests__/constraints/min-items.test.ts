import { constraints } from "..";
const { MinItems } = constraints;

const createHandler = () => {
  return {};
};

const createConstraint = (handler, opts) => new MinItems(handler, opts);

describe("MinItems: constraint", () => {
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
