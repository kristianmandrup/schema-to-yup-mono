import { SchemaEntry } from "./entry";

export function createSchemaEntry(propertySchema, config = {}) {
  // const { schema, name, key, value, config } = opts;
  return new SchemaEntry(propertySchema, config).toEntry();
}
