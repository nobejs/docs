---
slug: first-endpoint-using-nobe
title: First Endpoint using Nobe
authors: rajiv
tags: [tutorial]
---

This article explores getting started with Nobe with an example. Source code of this tutorial is present at: https://github.com/nobejs/first-endpoint

<!--truncate-->

### Step 1: Download and Setup

1. Download ZIP file from: https://github.com/nobejs/nobejs/archive/refs/tags/0.0.21.zip
2. Extract the zip file
3. You should see a folder `nobejs-0.0.21`, rename it to `first-endpoint`
4. Change into first-endpoint folder and then run: `yarn install`
5. Check the version of nobe: `yarn nobe:version` -> You should see:

```
Version: 0.0.21
Latest Available Version: 0.0.21
```

6. Copy .env.example to .env.jest, u can just run `cp .env.example .env.jest`
7. Fill in correct credentials of your postgres server in .env.jest
8. Run `yarn test --passWithNoTests`, It should say:

```
No tests found, exiting with code 0
```

That's because we didn't write any stories yet.

Before we go further, it would make sense to understand nobejs strategies once. If you haven't gone through PAHR Strategy, this would be the right time before we proceed. Please proceed to [PAHR Strategy](/docs/concepts/pahr-strategy) for more information.

Open: config.js

```
global.endpointStrategy = executeStrategy([
  "prepare",
  "authorize",
  "handle",
  "respond",
]);

global.testStrategy = executeStrategy([
  "callEverytime",
  "authorize",
  "handle",
  "respond",
]);
```

Here we declared two Strategies, one for executing endpoint (when api is called), another for testing. What endpointStrategy is insisting is that, prepare - authorize - handle - respond should be called in that order, where as testStrategy is insisting that callEverytime - authorize - handle - respond would be called.

Note: `callEverytime` does nothing at this point, and we won't be implementing it as part of this tutorial. We would be implementing "prepare - authorize - handle - respond" only.

### Step 2: Let's brainstorm Stories

Our client came to us with a requirement that they need an API to register a user. And user would be registering with an email address, password. And password should be secured. And after user can just login with that password. That's it. Their requirements look too simple, may be they are testing us! But, nonetheless, let's do it.

So, we have two stories, let's give them nice names:

1. UserCanRegister
2. UserCanLogin

Perfect!

Now, we do need a table where we can story the registered user, and then save their email and password. Let's call that table: `users` and database schema would be:

| column   | remarks                                     |
| -------- | ------------------------------------------- |
| uuid     | Unique uuid which works an primary key      |
| email    | Email address of the user                   |
| password | A string to store user's encrypted password |

### Step 3: Create Users Table

1. Run: `yarn db:migration create_users_table`
2. This would create a migration in `database/migrations/20211013162747_create_users_table.js`
3. We should add following content which will create the table.

```js
exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return knex.schema.createTable("users", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
```

Nobe uses Knexjs for query building and migrations. But it's no where a hardcoded dependency, you can easily change this, add your own library like Sequelize if you feel you need an ORM.

Are we going to create this table in database, actually no! We will write test cases which will handle this for us. Basically, we will write test cases to confirm that our code is working, no postman, no opening database at all.

### Step 4: Develop UserCanRegister story

- We will create the story first using a command, Run: `yarn gen:story "UserCanRegister"`
- You should see a folder created at: `src/stories/UserCanRegister` with three files:
  - src/stories/UserCanRegister/endpoint.spec.js -> We write tests to check our endpoint
  - src/stories/UserCanRegister/story.js -> This is where we implement our story
  - src/stories/UserCanRegister/tests.spec.js -> This is where we test our handler of story

Let's start writing down tests.spec.js: The first test we will do is, user can register:

```js
it("user_can_register", async () => {
  let result = {};
  try {
    result = await testStrategy("UserCanRegister", {
      prepareResult: {
        email: "bob@example.com",
        password: "verySecrective",
      },
    });
  } catch (error) {
    debugLogger(error);
  }
  const { respondResult } = result;

  expect(respondResult).toMatchObject({
    uuid: expect.any(String),
    email: "bob@example.com",
    password: expect.not.stringMatching("verySecretive"),
  });
});
```

If u run command `yarn test -i src/stories/UserCanRegister/tests.spec.js` This should something like following:

```
Test Suites: 1 failed, 1 total
```

To make this work we need to implement the handler, but remember, we are right now testing the handler not the api endpoint. As per Nobejs implementation, during testing we call Authorize -> Handle -> Respond these three phases only. And if you noted we are calling `testStrategy` like we saw in config.js

Let's delve into what to do in each phase for a bit:

- Authorize: I think any user can access this story at this point, so the function would simple return true

```js
const authorize = () => {
  return true;
};
```

- Handle: This is the meat of our story, basically this function should do two things:
  - Validate Input (If email, password are present)
  - Encrypt Password
  - Store in users table

```js
const validator = requireValidator();
const knex = requireKnex();
const bcrypt = require("bcrypt");

const validateInput = async (prepareResult) => {
  const constraints = {
    email: {
      email: true,
      presence: {
        allowEmpty: false,
        message: "^Please enter email",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter password",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    // Validate Input (If email, password are present)
    await validateInput(prepareResult);

    // Encrypt Password
    const hash = await bcrypt.hash(prepareResult.password, 10);

    // Store in users table
    const users = await knex("users")
      .insert({
        email: prepareResult.email,
        password: hash,
      })
      .returning("*");

    return users[0];
  } catch (error) {
    throw error;
  }
};
```

If u run command `yarn test -i src/stories/UserCanRegister/tests.spec.js` This should be passed now. So, that's it we implemented story and our test is passing, only thing left is to actually write an endpoint. Go to your endpoints.js file and add the following:

```js
endpoints: [
    ["post", "/register", "UserCanRegister"],
],
```

And write following test in `src/stories/UserCanRegister/endpoint.spec.js`

```js
it("user_can_register", async () => {
  let respondResult;
  try {
    const app = httpServer();

    const payload = {
      email: "bob@example.com",
      password: "verySecrective",
    };

    respondResult = await app.inject({
      method: "POST",
      url: "/register",
      payload,
    });
  } catch (error) {
    respondResult = error;
  }

  expect(respondResult.statusCode).toBe(200);
  expect(respondResult.json()).toMatchObject({
    uuid: expect.any(String),
    email: "bob@example.com",
    password: expect.not.stringMatching("verySecretive"),
  });
});
```

Only extra thing you need to here is that, nobejs by default required authentication on API endpoints, so we should remove this endpoint from requiring that. Go to `config.js` and make it look like following:

```js
    excludeFromAuth: ["POST /register", "POST /login"],
```

To run the test run: `yarn test -i src/stories/UserCanRegister/endpoint.spec.js` -> This would fail again because, remember for endpointStrategy we need to code `prepare` phase too. Go ahead and add following to story:

```js
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["email", "password"]);
  return payload;
};
```

Run: `yarn test -i src/stories/UserCanRegister/endpoint.spec.js` and you have a passing story.

So, we have implemented register api along with test cases. Though we didn't cover all possible test cases like we have to check what happens if user doesn't pass valid email, we should also confirm if password is stored in encrypted format etc., We are excluding them to make this longish tutorial bearable. Let's quickly implement login functionality too.

### Step 4: Develop UserCanLogin story

- Run `yarn nobe:genstory "UserCanLogin"`
- Let's write our test in src/stories/UserCanLogin/tests.spec.js

```js
it("user_can_login", async () => {
  let result = {};
  let registeredUser = {};
  try {
    registeredUser = await testStrategy("UserCanRegister", {
      prepareResult: {
        email: "bob@example.com",
        password: "verySecrective",
      },
    });

    result = await testStrategy("UserCanLogin", {
      prepareResult: {
        email: "bob@example.com",
        password: "verySecrective",
      },
    });
  } catch (error) {
    debugLogger(error);
  }

  const { respondResult } = result;

  expect(respondResult).toMatchObject({
    uuid: registeredUser["handleResult"].uuid,
    email: "bob@example.com",
    password: expect.not.stringMatching("verySecretive"),
  });
});
```

At the same time, let's write our story too:

```js
const validator = requireValidator();
const knex = requireKnex();
const bcrypt = require("bcrypt");
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["email", "password"]);
  return payload;
};

const authorize = () => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    email: {
      email: true,
      presence: {
        allowEmpty: false,
        message: "^Please enter email",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter password",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    await validateInput(prepareResult);
    const user = await knex("users")
      .where({ email: prepareResult.email })
      .first();

    if (!user) {
      throw {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }

    const passwordCheck = await bcrypt.compare(
      prepareResult.password,
      user.password
    );

    if (passwordCheck) {
      return user;
    } else {
      throw {
        statusCode: 401,
        message: "Invalid username or password",
      };
    }
  } catch (error) {
    throw error;
  }
};
```

Just run: `yarn test -i src/stories/UserCanLogin/tests.spec.js` which should give your success pass result.

- Let's test the endpoint too:

Add endpoint for login:

```js
      endpoints: [
        ["post", "/register", "UserCanRegister"],
        ["post", "/login", "UserCanLogin"],
      ],
```

Add following to `src/stories/UserCanLogin/endpoint.spec.js`

```js
it("user_can_login", async () => {
  let registerResult;
  let loginResult;
  try {
    const app = httpServer();

    const payload = {
      email: "bob@example.com",
      password: "verySecrective",
    };

    registerResult = await app.inject({
      method: "POST",
      url: "/register",
      payload,
    });

    loginResult = await app.inject({
      method: "POST",
      url: "/login",
      payload,
    });
  } catch (error) {
    loginResult = error;
  }

  expect(loginResult.statusCode).toBe(200);
  expect(loginResult.json()).toMatchObject({
    uuid: registerResult.json().uuid,
    email: "bob@example.com",
    password: expect.not.stringMatching("verySecretive"),
  });
});
```

And then run: `yarn test -i src/stories/UserCanLogin/endpoint.spec.js` to see tests passing.

Source code of this tutorial is present at: https://github.com/nobejs/first-endpoint
