import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const lowercase = (handler, opts) => new Lowercase(handler, opts);

export class Lowercase extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.addConstraint("lowercase");
  }
}
