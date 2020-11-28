import { BaseTypeConstraintsProcessor } from "..";

const createBaseTypeConstraintsProcessor = (handler, config) => {
  return new BaseTypeConstraintsProcessor(handler, config);
};

describe("BaseTypeConstraintsProcessor", () => {
  let config = {};
  let handler = {};

  describe("process(name)", () => {
    let btcp;
    beforeAll(() => {
      btcp = createBaseTypeConstraintsProcessor(handler, config);
    });

    context("instance", () => {
      describe("constraints", () => {
        it("returns constraints", () => {
          expect(btcp.constraints).toEqual({});
        });
      });

      describe("constraints", () => {
        it("returns constraints", () => {
          expect(btcp.constraints).toEqual({});
        });
      });

      describe("setConstraintsMap()", () => {
        it("sets constraints map", () => {
          expect(btcp.setConstraintsMap()).toEqual({});
        });
      });

      describe("setFactoriesMap()", () => {
        it("sets factories map", () => {
          expect(btcp.setFactoriesMap()).toEqual({});
        });
      });

      describe("createTypeConstraintProcessorFor(name)", () => {
        it("creates type constraint processor for named constraint", () => {
          expect(btcp.createTypeConstraintProcessorFor(name)).toEqual({});
        });
      });

      describe("fromClass(name)", () => {
        it("creates type constraint processor for named constraint from a class in classMap", () => {
          expect(btcp.fromClass(name)).toEqual({});
        });
      });

      describe("fromFactory(name)", () => {
        it("creates type constraint processor for named constraint from a factory function in factories", () => {
          expect(btcp.fromFactory(name)).toEqual({});
        });
      });

      describe("process(name)", () => {
        it("processes named constraint via constraint processor", () => {
          expect(btcp.process(name)).toEqual({});
        });
      });
    });
  });
});
