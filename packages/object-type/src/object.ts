import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export const toInstance = (obj, config = {}) => {
  return obj && new Guard(obj, config).handle();
};

// Allow recursive schema
export class ObjectType extends BaseType {
  properties: any;

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
  }

  get typeName() {
    return "object";
  }

  static create(obj) {
    return new ObjectType(obj);
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
