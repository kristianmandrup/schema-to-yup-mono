import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const trim = (handler, opts) => new Trim(handler, opts);

export class Trim extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.addConstraint("trim");
  }
}
