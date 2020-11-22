class ConvertYupSchemaError extends Error {}

import { YupBaseType } from "@schema-to-yup/base-type";

class YupMixed extends YupBaseType {
  constructor(opts: any = {}) {
    super(opts);
    this.init();
  }

  get yupType() {
    return "mixed";
  }

  init() {
    return this;
  }

  get mixedConfig() {
    return this.config.mixed || {};
  }

  isRequired(value) {
    value = value || this.value;
    return value.required === true;
  }

  // override for each type

  get mixedEnabled() {
    return (
      this.mixedConfig.enabled || [
        "label",
        "oneOf",
        "notOneOf",
        "when",
        "nullable",
        "isType",
      ]
    );
  }
}

export { YupMixed, ConvertYupSchemaError };
