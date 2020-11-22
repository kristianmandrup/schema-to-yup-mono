import { BaseTypeConstraint } from "@schema-to-yup/base-type";

export const nullable = (handler, opts) => new Nullable(handler, opts);

export class Nullable extends BaseTypeConstraint {
  constructor(handler, opts = {}) {
    super(handler, opts);
  }

  process() {
    const { nullable, isNullable } = this.constraints;
    const value = nullable || isNullable;
    this.addConstraint("nullable", { value, errName: "notOneOf" });
    return this;
  }
}
