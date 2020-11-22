import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const maxLength = (handler, opts) => new MaxLength(handler, opts);

export class MaxLength extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    const { constraints, valErrMessageOr } = this;
    const { maxLength } = constraints;
    const errMsg = valErrMessageOr("maxLength", "max");
    return this.chain((x) => maxLength && x.max(maxLength, errMsg));
  }
}
