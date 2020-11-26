import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { DateHelpers, typeMatcher } from "@schema-to-yup/core";

export class BaseDateConstraint extends BaseTypeConstraint {
  helper: any;

  constructor(handler, propertySchema = {}, config = {}) {
    super(handler, propertySchema, config);
    this.init();
  }

  init() {
    super.init();
    this.helper = new DateHelpers(this.propertySchema);
  }

  isNothing(value) {
    return typeMatcher.isNothing(value);
  }
}
