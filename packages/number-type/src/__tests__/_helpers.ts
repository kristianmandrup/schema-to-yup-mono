import { toNumber, toNumberSchemaEntry, yup } from "./_imports";

export const isInteger = (fieldDef) =>
  fieldDef && (fieldDef.type === "int" || fieldDef.type === "integer");

export const isNumber = (fieldDef) =>
  fieldDef && (fieldDef.type === "number" || isInteger(fieldDef));

export const config = { isNumber, isInteger };

export const createNum = (value) => {
  const obj = { value, config, key: "value", type: "number" };
  return toNumber(obj, config);
};

export const createEntry = (fieldDef) => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return toNumberSchemaEntry(obj, config);
};

export const createNumEntry = (value) => {
  const obj = { value, config, key: "value", type: "number" };
  return toNumberSchemaEntry(obj, config);
};

export const createIntEntry = (value) => {
  const obj = { value, config, key: "value", type: "int" };
  return toNumberSchemaEntry(obj, config);
};

export const createNumNoKeyEntry = (value) => {
  const obj = { value, config, type: "number" };
  return toNumberSchemaEntry(obj, config);
};

export const createSchema = (value) => {
  return yup.object().shape({
    value,
  });
};
