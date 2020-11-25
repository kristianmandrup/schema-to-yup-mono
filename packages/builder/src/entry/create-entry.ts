import { SchemaEntry } from "./entry";

export function createSchemaEntry(opts = {}) {
  // const { schema, name, key, value, config } = opts;
  return new SchemaEntry(opts).toEntry();
}
