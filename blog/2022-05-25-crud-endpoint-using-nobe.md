---
slug: crud-endpoint-using-nobe
title: CRUD Endpoint using Nobe
authors: rajiv
tags: [tutorial]
---

This article explores getting started with Nobe with an example. Source code of this tutorial is present at: https://github.com/nobejs/first-endpoint

<!--truncate-->

### Step 1:

Create a story with following content:

`yarn nobe:genstory CanManagePhotos`

```js
const crudHelpers = requireUtil("crudHelpers");

const table = "photos";
const schema = [
  {
    key: "uuid",
    includeInResult: true,
    operations: ["update", "destroy", "show"],
    rules: {
      presence: {
        allowEmpty: false,
        message: "^Please enter uuid",
      },
    },
  },
  {
    key: "creator_user_uuid",
    includeInResult: true,
    operations: ["update", "store"],
    rules: {
      presence: {
        allowEmpty: false,
        message: "^Please enter creator_user_uuid",
      },
    },
  },
  {
    key: "name",
    includeInResult: true,
    operations: ["update", "store"],
    rules: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
    },
  },
  {
    key: "tenant",
    includeInResult: true,
    operations: ["update", "store"],
    rules: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
    },
  },
  {
    key: "created_at",
    includeInResult: true,
    operations: ["store"],
  },
  {
    key: "updated_at",
    includeInResult: true,
    operations: ["update", "store"],
  },
  {
    key: "deleted_at1",
    operations: ["destroy"],
  },
  {
    key: "slug",
    includeInResult: true,
    operations: ["update", "store"],
    rules: {
      presence: {
        allowEmpty: false,
        message: "^Please enter name",
      },
      custom_callback: {
        message: "Identifier should be unique",
        callback: async (payload) => {
          // May be you want to call database and check for uniqueness
          return true;
        },
      },
    },
  },
];

const prepare = ({ req, operation }) => {
  const payload = crudHelpers.prepareResult(req, schema, operation);
  payload["creator_user_uuid"] = "7aefaf01-73f3-4418-aac0-dfc08e73cbcb";
  return payload;
};

const authorize = async ({ prepareResult, operation }) => {
  if (operation === "create") {
    return true;
  } else {
    // do some checks and return true or throw an error
    return true;
  }
};

const handle = async ({ prepareResult, operation }) => {
  try {
    await crudHelpers.validateInput(schema, prepareResult, operation);
    return await crudHelpers.handleOperation(
      table,
      schema,
      prepareResult,
      operation
    );
  } catch (error) {
    throw error;
  }
};

const respond = async ({ handleResult, operation }) => {
  try {
    return crudHelpers.respond(schema, handleResult, operation);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
```

### Step 2:

Create migration

`yarn db:migration create_photos_table`

```js
exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return knex.schema.createTable("photos", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.uuid("creator_user_uuid").notNullable();
    table.string("name", 255);
    table.string("slug", 255);
    table.string("tenant", 255);
    table.datetime("created_at");
    table.datetime("updated_at");
    table.datetime("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("photos");
};
```

### Step 3:

Exlude routes

```js
    excludeFromAuth: [
      "GET /liveness",
      "POST /readiness",
      "POST /photos",
      "GET /photos",
      "GET /photos/:uuid",
      "PUT /photos/:uuid",
      "DELETE /photos/:uuid",
    ],
```

### Step 4:

Add endpoint

```
endpoints: [
    ["crud", "/photos", "CanManagePhotos"],
],
```
