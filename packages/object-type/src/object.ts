import { YupBaseType } from "@schema-to-yup/base-type";

// Allow recursive schema
export class YupObject extends YupBaseType {
  properties: any;

  constructor(obj) {
    super(obj);
    this.properties = this.value.properties;
  }

  get yupType() {
    return "object";
  }

  static create(obj) {
    return new YupObject(obj);
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
