import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const positive = (handler, opts) => new Positive(handler, opts);

export class Positive extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.isPositive && this.addConstraint("positive");
  }

  get isPositive() {
    const { exclusiveMinimum, positive } = this.constraints;
    if (positive) return true;
    if (exclusiveMinimum === undefined) return false;
    return exclusiveMinimum === 0;
  }
}
