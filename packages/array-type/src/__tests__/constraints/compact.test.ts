import { constraints } from "..";
const { Compact } = constraints;

const createHandler = () => {
  return {};
};

const createConstraint = (handler, opts) => new Compact(handler, opts);

describe("Compact: constraint", () => {
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
