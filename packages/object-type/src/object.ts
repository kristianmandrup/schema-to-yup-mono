import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export const createTypeHandler = (obj, config = {}) => {
  return obj && new Guard(obj, config).handle();
};

// Allow recursive schema
export class TypeHandler extends BaseType {
  properties: any;

  constructor(obj, config) {
    super(obj, config);
    this.properties = this.value.properties;
  }

  get typeName() {
    return "object";
  }

  static create(obj, config) {
    return new TypeHandler(obj, config);
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
