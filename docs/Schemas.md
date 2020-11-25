# Schemas

## Custom schema models

This library now also supports non JSON schema models. See the `types/defaults` mappings.

`types/defaults/json-schema.js`

```js
module.exports {
  getProps: obj => obj.properties,
  getType: obj => obj.type,
  getName: obj => obj.name || obj.title,
  getConstraints: obj => obj,
  isString: obj => obj.type === "string",
  isArray: obj => obj.type === "array",
  isInteger: obj => obj.type === "integer",
  isBoolean: obj => obj.type === "boolean",
  hasDateFormat: obj => ["date", "date-time"].find(t => t === obj.format),
  isDate: obj => obj.type === "string" && defaults.hasDateFormat(obj.format),
  isNumber: obj => obj.type === "number" || defaults.isInteger(obj.type),
  isObject: obj => obj.type === "object",
  isRequired: obj => obj.required
};
```

This can be used to support any kind of schema, including JSN schema and GraphQL type definition schemas etc.

### GraphQL schema

To support another model, such as GraphQL schema (type definitions) via [graphSchemaToJson](https://github.com/kristianmandrup/graphSchemaToJson)

Person:

```js
{
  Person: {
    name: 'Person',
    fields: {
      name: {
        type: 'String',
        directives: {
          constraints: {
            minLength: 2
          }
        },
        isNullable: false,
        isList: false
      }
    }
    directives: {},
    type: 'Object',
    implements: []
  }
}
```

Create a map of methods to match your model layout:

```js
const typeDefConf = {
  getProps: (obj) => obj.fields,
  getType: (obj) => obj.type,
  getName: (obj) => obj.name,
  getConstraints: (obj) => (obj.directives || {}).constraints || {},
  isString: (obj) => obj.type === "String",
  isArray: (obj) => obj.isList,
  isInteger: (obj) => obj.type === "Int",
  isBoolean: (obj) => obj.type === "Boolean",
  isDate: (obj) => obj.type === "Date" || obj.directives.date,
  isNumber: (obj) => obj.type === "Int" || obj.type === "Float",
  isObject: (obj) => obj.type === "Object",
  isRequired: (obj) => !obj.isNullable,
};
```

Please note that `getConstraints` can be used to control where the constraints of the field will be taken from (depending on the type of model/schema or your preference).

Pass overrides to match your model in `config` as follows:

```js
const schema = buildYup(nameJsonSchema, { ...typeDefConf, log: true });
```

The type definition mappings above are already built-in and available.
To switch the schema type, pass `schemaType` in config as follows.

```js
const schema = buildYup(nameJsonSchema, { schemaType: "type-def", log: true });
```

Feel free to make PRs to make more common schema models conveniently available!

### Complex/Nested schemas

Nested object schema properties are supported.

See `complex-schema.test.js`
