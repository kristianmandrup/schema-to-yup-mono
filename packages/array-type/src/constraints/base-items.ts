import { BaseTypeConstraint } from "@schema-to-yup/base-type";
import { typeMatcher } from "@schema-to-yup/core";
import { ArraySizeHelper } from "./size-helper";

export class BaseItems extends BaseTypeConstraint {
  sizeHelper: any;

  constructor(handler, opts = {}) {
    super(handler, opts);
    this.sizeHelper = new ArraySizeHelper(handler, opts);
  }

  isNumberType(value) {
    return typeMatcher.isNumberType(value);
  }
}
