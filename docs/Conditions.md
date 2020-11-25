# Conditional logic

Basic support for [when conditions](https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema) as requested and outlined in [this issue](https://github.com/kristianmandrup/schema-to-yup/issues/14) is now included.

Work will continue in the [when-condition](https://github.com/kristianmandrup/schema-to-yup/tree/when-condition) branch.

Sample schema using simple `when` constraint:

```js
const biggyJson = {
  title: "biggy",
  type: "object",
  properties: {
    isBig: {
      type: "boolean",
    },
    count: {
      type: "number",
      when: {
        isBig: {
          is: true,
          then: {
            min: 5,
          },
        },
      },
    },
  },
};
```

Sample valid and invalid values with respect to `biggyJson` schema

```js
const bigJson = {
  valid: {
    isBig: true,
    count: 5, // since isBig is set, must be >= 5
  },
  invalid: {
    isBig: true,
    count: 4, // since isBig is set, must be >= 5
  },
};
```

Currently basic support is included in `schema-to-yup@1.9.0` on [npmjs](https://www.npmjs.com)

More advanced conditionals support will likely be included the next major release: `2.0`.

You are welcome to continue the effort to support more conditional schema logic by continuing on this branch and making PRs.

Support for `if` `then` and `else` [conditional JSON schema constraints](https://json-schema.org/latest/json-schema-validation.html#rfc.section.6.6) can likely be added using an approach like the `when` condition (perhaps by transalating to equivalent: `when`, `then` and `otherwise`).

- `if` - This keyword's value MUST be a valid JSON Schema
- `then` - This keyword's value MUST be a valid JSON Schema
- `else` - This keyword's value MUST be a valid JSON Schema

See also [json-schema-spec](https://github.com/json-schema-org/json-schema-spec/issues/180)

### Customizing conditional logic

You can now also override, extend or customize the `when` condition logic by passing in your own factory method for the config object entry `createWhenCondition`

```js
const myWhenConditionFactoryFn = (opts = {}) => {
  const { type, key, value, when, schema, properties, config } = opts;
  // ...
};

const config = {
  createWhenCondition: myWhenConditionFactoryFn,
};
const schema = buildYup(nameJsonSchema, config);
```

The best and easiest way to do this is to extend the `WhenCondition` class which contains most of the necessary infrastructure you can further build on.

See the `src/conditions/legacy` folder for the legacy `1.9.0` logic that works but has limited functionality.
