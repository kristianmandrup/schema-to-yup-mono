import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { typeMatcher } from "@schema-to-yup/core";

export const round = (handler, opts) => new Round(handler, opts);

export class Round extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    const { round } = this.constraints;
    if (typeMatcher.isNothing(round)) {
      return this;
    }
    const roundLabel = typeMatcher.isStringType(round) ? round : "round";
    return this.chain((x) => roundLabel && x.round(roundLabel));
  }
}
