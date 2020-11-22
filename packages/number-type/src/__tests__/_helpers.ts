import { toYupNumber, toYupNumberSchemaEntry, yup } from "./_imports";

export const isInteger = (fieldDef) =>
  fieldDef && (fieldDef.type === "int" || fieldDef.type === "integer");

export const isNumber = (fieldDef) =>
  fieldDef && (fieldDef.type === "number" || isInteger(fieldDef));

export const config = { isNumber, isInteger };

export const createNum = (value) => {
  const obj = { value, config, key: "value", type: "number" };
  return toYupNumber(obj, config);
};

export const createEntry = (fieldDef) => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return toYupNumberSchemaEntry(obj, config);
};

export const createNumEntry = (value) => {
  const obj = { value, config, key: "value", type: "number" };
  return toYupNumberSchemaEntry(obj, config);
};

export const createIntEntry = (value) => {
  const obj = { value, config, key: "value", type: "int" };
  return toYupNumberSchemaEntry(obj, config);
};

export const createNumNoKeyEntry = (value) => {
  const obj = { value, config, type: "number" };
  return toYupNumberSchemaEntry(obj, config);
};

export const createSchema = (value) => {
  return yup.object().shape({
    value,
  });
};
