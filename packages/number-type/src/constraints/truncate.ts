import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const truncate = (handler, opts) => new Truncate(handler, opts);

export class Truncate extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.addConstraint("truncate");
  }
}
