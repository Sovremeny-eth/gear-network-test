# TypeORM Presets

TypeORM is unable to properly handle differences between different database mappings.

This package helps deal with it. It makes it possible to utilize data types unsupported by some databases.

## Usage

Import and use appropriate symbols from `@gear-test/typeorm-presets` package. Thus, the default (PostgreSQL) ORM
preset will be used.

To utilize SqLite within tests, an `sqlite` profile can be enabled. For that place the following option to
`jest.config.js` file within you project:

```javascript
export default {
  //...
  moduleNameMapper: {
    '^@gear-test/typeorm-presets$': '@gear-test/typeorm-presets/sqlite',
  },
  //...
};
```
