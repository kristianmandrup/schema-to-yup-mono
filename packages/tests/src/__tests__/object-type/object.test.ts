import { create, createObject, createObjectNoKey } from "./helpers";

describe("createObject", () => {
  test("null - %", () => {
    expect(create(null)).toBeFalsy();
  });

  // TODO: fix?
  test.skip("empty value - ok", () => {
    expect(createObject({})).toBeTruthy();
  });

  test.skip("no key - throws missing key", () => {
    expect(() => createObjectNoKey({})).toThrow();
  });
});
