import { toInstance } from "..";

const isBoolean = (fieldDef) => fieldDef && fieldDef.type === "boolean";
const config = { isBoolean };
const create = (fieldDef) => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return toInstance(obj, config);
};

const createBool = (value) => {
  const obj = { value, config, key: "x", type: "boolean" };
  return toInstance(obj, config);
};

const createBoolNoKey = (value) => {
  const obj = { value, config, type: "boolean" };
  return toInstance(obj, config);
};

describe("boolean: create", () => {
  test("null - %", () => {
    expect(create(null)).toBeFalsy();
  });

  test("empty value - ok", () => {
    expect(createBool({})).toBeTruthy();
  });

  test("no key - throws missing key", () => {
    expect(() => createBoolNoKey({})).toThrow();
  });
});
