import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { typeMatcher } from "@schema-to-yup/core";

export const pattern = (handler, opts) => new Pattern(handler, opts);

export class Pattern extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    const { constraints, valErrMessageOr } = this;
    const { pattern, flags } = constraints;
    if (typeMatcher.isEmpty(pattern)) {
      return this;
    }
    const regex = new RegExp(pattern, flags);
    const errMsg = valErrMessageOr("pattern", "matches", "regex");
    return this.chain((x) => regex && x.matches(regex, errMsg));
  }
}
