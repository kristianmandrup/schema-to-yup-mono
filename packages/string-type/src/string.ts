import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export const createTypeHandler = (obj, config = {}) => {
  return obj && new Guard(obj, config).handle();
};

export class TypeHandler extends BaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "string";
  }

  static create(obj) {
    return new TypeHandler(obj);
  }

  get typeEnabled() {
    return [
      "normalize",
      "minLength",
      "maxLength",
      "pattern",
      "lowercase",
      "uppercase",
      "email",
      "url",
      "format",
    ];
  }

  normalize() {
    this.constraints.pattern =
      this.constraints.pattern ||
      this.constraints.matches ||
      this.constraints.regex;
    this.constraints.maxLength =
      this.constraints.maxLength || this.constraints.max;
    this.constraints.minLength =
      this.constraints.minLength || this.constraints.min;
  }
}
