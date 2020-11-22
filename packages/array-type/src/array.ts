// See:
// http://json-schema.org/latest/json-schema-validation.html#rfc.section.6.4

import { YupBaseType } from "@schema-to-yup/base-type";

export class YupArray extends YupBaseType {
  constructor(obj) {
    super(obj);
    this.createYupSchemaEntry = this.config.createYupSchemaEntry;
  }

  get yupType() {
    return 'array'
  }

  static create(obj) {
    return new YupArray(obj);
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
