import { BaseType } from "@schema-to-yup/base-type";
import { Guard } from "./guard";

export function toInstance(obj, config = {}) {
  return obj && new Guard(obj, config).handle();
}

export class ArrayType extends BaseType {
  createYupSchemaEntry: any;

  constructor(obj) {
    super(obj);
    this.createYupSchemaEntry = this.config.createYupSchemaEntry;
  }

  get typeName() {
    return "array";
  }

  static create(obj) {
    return new ArrayType(obj);
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
