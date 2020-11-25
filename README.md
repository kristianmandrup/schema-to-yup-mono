# schema-to-yup

This is a revision of `schema-to-yup` using a monorepo approach.

This library can be used to build a [Yup]() schema from a JSON Schema, GraphQL schema (type definition) or any other similar type/class and field/properties model or schema :)

## Installation

`yarn add @schema-to-yup/builder @schema-to-yup/types`

## Documentation

- [Customization](./docs/Customization.md)
- [Schemas](./docs/Schemas.md)
- [Type handlers](./docs/Types.md)
- [Conditional logic](./docs/Conditions.md)
- [Examples](./docs/Examples.md)
- [Development](./docs/Development.md)
- [Legacy readme](./docs/Readme-Legacy.md)

## Usage

The type handlers have been completely decoupled from the builder.

You can choose to:

- use the default set of type handlers
- use your own or any combination/mix

This should make it much easier to customize the internals to fit your needs and allow the community an easy path to provide extensions.

## Quick start

```ts
import { types } from "@schema-to-yup/types";
import { createBuilder } from "@schema-to-yup/builder";

const builder = createBuilder({ types });
const jsonSchema = {
  // ...
};

// builds yup schema from a JSON or GraphQL schema
const yupSchema = builder.build(jsonSchema);
```

This would generate the following Yup validation schema:

```js
const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().required().positive(),
});
```

### Async validation

```ts
const valid = await yupSchema.isValid({
  name: "jimmy",
  age: 24,
});
```

### Sync yup validation

```ts
const valid = schema.isValidSync({
  type: "Person",
  name: "Administrator",
  level: 3,
  color: "blue",
});
```

## Advanced usage guide

- [References](#Refs)
- [Runtime Mode](#Mode)
- [Shape](#Shape)

### Refs

Please note that this library does not currently resolve `$ref` (JSON Pointers) out of the box. You can use another library for that.

You could f.ex use [json-schema-ref-parser](https://www.npmjs.com/package/json-schema-ref-parser) to preprocess your schema. Also see:

- [schema-deref](https://www.npmjs.com/package/schema-deref)
- [jsonref](https://www.npmjs.com/package/jsonref)

### Runtime Mode

By default, any property will be explicitly `notRequired` unless set to be required, either via `required: true` in the property constraint object or via the `required` list of properties of the `object` schema definition (of the property).

You can override the `notRequired` behavior by setting it on the new `mode` object of the configuration which can be used to control and fine-tune runtime behaviour.

```js
const jsonSchema = {
  title: "users",
  type: "object",
  properties: {
    username: { type: "string" },
  },
};
```

### Mode examples

```js
const yupSchema = buildYup(jsonSchema, {
  mode: {
    notRequired: true, // default setting
  },
});

// will be valid since username is not required by default
const valid = yupSchema.validateSync({
  foo: "dfds",
});
```

```js
const yupSchema = buildYup(jsonSchema, {
  mode: {
    notRequired: false,
  },
});

// will be invalid since username is required by default when notRequired mode is disabled
const valid = yupSchema.validateSync({
  foo: "dfds",
});
```

### Shape

You can access the internal Yup shape, via `shapeConfig` on the yup schema returned by the `buildYup` schema builder function.
This allows you to easily mix and match to suit more advanced requirements.

```js
const { buildYup } = require("json-schema-to-yup");
const { shapeConfig } = buildYup(json, config);
const schema = yup.object().shape({
  ...shapeConfig,
  ...customShapeConfig,
});
```

## Similar projects

- [JSON schema to Elastic Search mapping](https://github.com/kristianmandrup/json-schema-to-es-mapping)
- [JSON Schema to GraphQL types with decorators/directives](https://github.com/kristianmandrup/json-schema-to-graphql-types-decorated)
- [JSON Schema to Mongoose schema](https://github.com/kristianmandrup/convert-json-schema-to-mongoose)
- [JSON Schema to MobX State Tree types](https://github.com/ralusek/jsonschema-to-mobx-state-tree)
- [Convert JSON schema to mongoose 5 schema](https://github.com/kristianmandrup/convert-json-schema-to-mongoose)

The library [JSON Schema model builder](https://github.com/kristianmandrup/json-schema-model-builder#readme) is a powerful toolset to build a framework to create any kind of output model from a JSON schema.

If you enjoy this declarative/generator approach, try it out!

## Testing

Uses [jest](jestjs.io/) for unit testing.

- Have unit tests that cover most of the constraints supported.
- Please help add more test coverage and help refactor to make this lib even more awesome :)

## Ideas and suggestions

Please feel free to come with ideas and suggestions on how to further improve this library.

## Author

2018-2021 Kristian Mandrup

## License

MIT
