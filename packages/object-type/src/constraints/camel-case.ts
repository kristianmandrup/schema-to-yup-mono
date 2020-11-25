import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const camelCase = (handler, opts) => new CamelCase(handler, opts);

export class CamelCase extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    return this.addConstraint("camelCase");
  }
}
