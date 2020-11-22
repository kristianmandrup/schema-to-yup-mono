import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const ensureItems = (handler, opts) => new EnsureItems(handler, opts);

export class EnsureItems extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.addConstraint("ensure");
  }
}
