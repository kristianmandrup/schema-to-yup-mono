import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const integer = (handler, opts) => new Integer(handler, opts);

export class Integer extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    this.isInteger && this.addConstraint("integer");
    return this;
  }

  get isInteger() {
    return this.config.isInteger(this.type);
  }
}
