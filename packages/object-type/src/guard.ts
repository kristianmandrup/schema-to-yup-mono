import { YupObject } from "./object";

import { Guard } from "@schema-to-yup/core";

export class ObjectGuard extends Guard {
  constructor(obj, config: any = {}) {
    super(obj, config);
  }

  isObject() {
    return this.config.isObject(this.obj.value);
  }

  handle() {
    return (
      this.isObject() &&
      YupObject.create({ ...this.obj, config: this.config }).createSchemaEntry()
    );
  }
}

export function createObjectGuard(obj, config = {}) {
  return new ObjectGuard(obj, config);
}
