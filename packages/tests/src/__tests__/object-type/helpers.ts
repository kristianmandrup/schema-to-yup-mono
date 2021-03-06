import {
  createTypeHandler,
  createObjectGuard,
} from "@schema-to-yup/object-type";
import { buildSchema } from "@schema-to-yup/builder";

const isObject = (fieldDef) => fieldDef && fieldDef.type === "object";
const config = { isObject };

export { buildSchema, createObjectGuard };

export const create = (fieldDef) => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return createTypeHandler(obj, config);
};

export const createObject = (value) => {
  const obj = { value, config, key: "x", type: "object" };
  return createTypeHandler(obj, config);
};

export const createObjectNoKey = (value) => {
  const obj = { value, config, type: "object" };
  return createTypeHandler(obj, config);
};

export const dogSchema = {
  type: "object",
  title: "Dog",
  properties: {
    name: {
      type: "string",
    },
    age: {
      type: "number",
    },
  },
};

export const schema = {
  type: "object",
  title: "Person",
  properties: {
    name: {
      type: "string",
    },
    dog: dogSchema,
    pets: {
      type: "array",
      items: dogSchema,
    },
  },
  required: ["name"],
};
