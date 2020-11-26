import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export function createTypeHandler(obj, config = {}) {
  return obj && new Guard(obj, config).handle();
}

export class TypeHandler extends BaseType {
  createYupSchemaEntry: any;

  constructor(obj, config) {
    super(obj, config);
    this.createSchemaEntry = this.config.createSchemaEntry;
  }

  get typeName() {
    return "array";
  }

  static create(obj, config) {
    return new TypeHandler(obj, config);
  }

  convert() {
    super.convert();
    return this;
  }

  get typeEnabled() {
    return ["maxItems", "minItems", "ensureItems", "compact", "itemsOf"];
  }

  $items() {
    return this;
  }

  $additionalItems() {
    return this;
  }

  $uniqueItems() {
    return this;
  }

  $contains() {
    return this;
  }
}
