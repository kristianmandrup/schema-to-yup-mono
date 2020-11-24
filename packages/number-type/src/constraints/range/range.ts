import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { createRangeConstraint } from "./range-constraint";

export const range = (handler, opts) => new Range(handler, opts);

export class Range extends BaseTypeConstraint {
  rangeConstraint: any;

  constructor(handler, opts = {}) {
    super(handler, opts);
    this.rangeConstraint = createRangeConstraint(this);
  }

  process() {
    this.rangeConstraint.add();
  }
}
