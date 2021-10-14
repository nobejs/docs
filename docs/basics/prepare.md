# Prepare

### About

"Prepare" is the first function mentioned in endpointStrategy. There is actually no "significance" of the name here for the functionality to work.

Inside PAHR, we think of it as a function which is responsible from reading input from external interface (like api endpoint, http server) and prepare/clean it in such a way that "Handle" can use it further. 

We often see "req", "res" objects being passed and there is depedency on those inside other functions which makes the code not-testable and less scalable. That's why PAHR insists that Prepare is a phase in itself.

### Input

As part of endpointStrategy, the "first" function of sequence always gets an input with a context of followings values:

```js
{
    req,
    res,
    next,
    reqBody: req.body,
    reqParams: req.params,
    reqQuery: req.query,
    reqHeaders: req.Headers,
}
```

So, if you have prepare function in your story.js, you would basically get above as argument and you prepare your payload from it. For example, let's say your story is `UserCanCreateBlogPost` and the input might be:

```
{
  "title": "Hello world",
  "slug": "hello-world"
}
```

And you also pass Bearer token so that user can be identified.

Your prepare function then would be something like follows:

```js
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["name", "slug"]);
  payload["creator_user_uuid"] = req.user;
  return payload;
};
```

### Output

The next function in the sequence can get the above payload as `prepareResult` from the context passed.