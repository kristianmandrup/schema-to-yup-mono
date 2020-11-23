import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { typeMatcher } from "@schema-to-yup/core";
import { ArraySizeHelper } from "./size-helper";

export class BaseItems extends BaseTypeConstraint {
  sizeHelper: any;

  constructor(handler, config: any = {}) {
    super(handler, config);
    this.sizeHelper = new ArraySizeHelper(config);
  }

  isNumberType(value) {
    return typeMatcher.isNumberType(value);
  }
}
