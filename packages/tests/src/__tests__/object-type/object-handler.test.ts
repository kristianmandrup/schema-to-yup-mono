import { createObjectGuard, schema, dogSchema, buildSchema } from "./helpers";

describe("ObjectHandler", () => {
  describe("createObjectGuard", () => {
    describe("config object - null", () => {
      test("creates using empty config", () => {
        expect(createObjectGuard(null)).toBeTruthy();
      });
    });

    describe("config object", () => {
      test("creates using config", () => {
        expect(createObjectGuard({ x: 2 })).toBeTruthy();
      });
    });
  });

  describe("instance", () => {
    describe("handle", () => {
      describe("recursive object schema", () => {
        const instance = createObjectGuard({ schema, buildSchema });
        const obj = {
          key: "dog",
          type: "object",
          schema,
          value: dogSchema,
        };
        const dogYupSchema = instance.handle();

        const dog = {
          valid: {
            name: "Spot",
            age: 1,
          },
          invalid: {
            age: "x",
          },
        };

        test("valid dog", () => {
          const valid = dogYupSchema.isValidSync(dog.valid);
          expect(valid).toBeTruthy();
        });

        test("invalid dog", () => {
          const valid = dogYupSchema.isValidSync(dog.invalid);
          expect(valid).toBeFalsy();
        });
      });
    });
  });
});
