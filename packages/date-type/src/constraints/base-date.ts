import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { DateHelpers, typeMatcher } from "@schema-to-yup/core";

export class BaseDateConstraint extends BaseTypeConstraint {
  helper: any;

  constructor(handler, opts = {}) {
    super(handler, opts);
    this.init();
  }

  init() {
    super.init();
    this.helper = new DateHelpers(this.opts);
  }

  isNothing(value) {
    return typeMatcher.isNothing(value);
  }
}
