import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export const createTypeHandler = (obj, config = {}) => {
  return obj && new Guard(obj, config).handle();
};

// Allow recursive schema
export class TypeHandler extends BaseType {
  properties: any;

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
  }

  get typeName() {
    return "object";
  }

  static create(obj) {
    return new TypeHandler(obj);
  }

  get typeEnabled() {
    return ["noUnknown", "camelCase", "constantCase", "recursive"];
  }

  convert() {
    if (!this.properties) return this;

    super.convert();
    return this;
  }
}
