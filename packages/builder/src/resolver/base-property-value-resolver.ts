import { Base } from "@schema-to-yup/core";

export class PropertyValueResolverError extends Error {}

export class BasePropertyValueResolver extends Base {
  kind: string;
  value: any;
  schema: any;
  key: string;
  name: string;
  type: string;
  types: any;

  constructor(propertySchema, config: any = {}) {
    super(propertySchema, config);
    const { value, type, kind, name, key, types } = propertySchema;
    const { schema } = config;
    this.propertySchema = propertySchema;
    this.kind = kind;
    this.value = value;
    this.schema = schema;
    this.key = key;
    this.value = value || {};
    this.name = name;
    this.type = type;
    this.types = types;
  }

  error(msg, data) {
    const { propertySchema } = this;
    data
      ? console.error(msg, data, propertySchema)
      : console.error(msg, propertySchema);
    throw new PropertyValueResolverError(msg);
  }

  resolve() {
    throw "Must be implemented by subclass";
  }
}
