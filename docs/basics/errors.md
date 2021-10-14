# Handling Errors

### HTTP Error Handler

Nobe comes with a errorHandler configured in `config.js`

```js
    errorHandler: "./core/errorHandler",
    notFoundHandler: "./core/notFoundHandler",
```

You can customize these anytime to make it more suitable for you.

The errorHandler which comes with Nobejs expects that you throw error in following manner:

```
throw {
 statusCode: 4XX/5XX
 ...
}
```

"statusCode" key is mandatory it to throw correct code else it will default to 500.

### Sentry

Coming Soon..