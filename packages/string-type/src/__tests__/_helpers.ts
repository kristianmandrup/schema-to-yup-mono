import * as yup from "yup";
import { buildYup } from "@schema-to-yup/builder";
import { toYup } from "..";
export { buildYup };

const isString = (fieldDef) => fieldDef && fieldDef.type === "string";
const config = { isString };

export const create = (fieldDef) => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return toYup(obj, config);
};

export const createStr = (value, key = "x") => {
  const obj = { value, config, key, type: "string" };
  return toYup(obj, config);
};

export const createStrNoKey = (value) => {
  const obj = { value, config, type: "string" };
  return toYup(obj, config);
};

export const createSchema = (schemaEntry, label = "value") => {
  if (!schemaEntry) {
    console.error("createSchema: missing schemaEntry", label);
  }
  // const { _whitelist } = schemaEntry || {};
  // const list = (_whitelist && _whitelist.list) || [];

  return yup.object().shape({
    [label]: schemaEntry,
  });
};
