# Authentication

NobeJS assumes that every endpoint needs user should be authenticated. 

### Basics

Nobe assumes that most of the route need authentication and a JWT token would be passed as Bearer token for this purpose. It doesn't do any token verification. Also it expects that JWT token has a claim called "sub", and puts the value in sub in req.user

`core/authMiddleware.js` should give you complete idea

### Excluding Routes

Just go to config.js and add your routes in array of excludeFromAuth

```js
excludeFromAuth: ["GET /liveness", "POST /readiness"],
```

The format is ["METHOD /URI"], you can also include dynamic params too like: `"GET /teams/:uuid/stripe/subscribe",`


### Customize

You can change the default behaviour simple by overriding and write your own authMiddleware and configuring in `config.js`

`authMiddleware: "./core/authMiddleware",`

### Utilities

As part of testing we often want to create a fake user and make a token for them.

#### Create a random user

You can run `yarn nobe:genuser`

The above command would be generating a random uuid and token with the same uuid as "sub" in the JWT.

#### Create an user with UUID

You can run `yarn nobe:genuser 63411080-cced-4a5e-8230-8673c3172308`

This would create a JWT token with sub claim filled with above value of UUID

#### Endpoint Testing

As part of endpoint testing, while calling APIs, you usually need a random user.

You can use "randomUser" function to generate uuid and token.

```js
const contextClassRef = requireUtil("contextHelper");

describe("API UserCanCreateTeam", () => {
  beforeAll(async () => {
    contextClassRef.user = randomUser();
    contextClassRef.headers = {
      Authorization: `Bearer ${contextClassRef.user.token}`,
    };
  });

  it("user_can_create_team", async () => {
    let response;

    try {
        const app = httpServer();

        respondResult = await app.inject({
            method: "POST",
            url: "/teams",
            payload,
            headers: contextClassRef.headers,
        });

    } catch (error) {
      response = error;
    }

  });

});
```

The contextHelper is a class which can be used in other classes to and carry the context from one place to another.

