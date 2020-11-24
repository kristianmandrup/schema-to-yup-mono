import { YupBaseType } from "@schema-to-yup/base-type";
import { StringGuard as Guard } from "./guard";

export const toYup = (obj, config = {}) => {
  return obj && new Guard(obj, config).handle();
};
export { Guard };

export class YupString extends YupBaseType {
  constructor(obj) {
    super(obj);
  }

  get yupType() {
    return "string";
  }

  static create(obj) {
    return new YupString(obj);
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
