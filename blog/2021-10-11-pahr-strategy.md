---
slug: pahr-strategy
title: PAHR Strategy
authors: rajiv
tags: [concepts, philosophy]
---

PAHR is a concept which comes out of the box with Nobe; it is an execution strategy for a story. Before we delve into Nobe itself, this article is an effort to describe PAHR in an agnostic way that it's not linked to any framework or a programming language.

<!--truncate-->

PAHR stands for - Prepare, Authorize, Handle, Respond

The basic philosophy behind PAHR is that there should be a consistent way for developers to implement the user stories. You may develop a completely different strategy, but there must be a strategy.

As we are application developers, we have to implement a lot of APIs for frontend applications to consume, so PAHR suits our thought process.

Let's take a simple story like:

"As a User, I can watch a movie."

When we execute the above story using PAHR, we take it through all four phases. But, to make it more sensible, let me take a different route.

The **"Handle"** phase is the centerpiece of the story; the main actions happen, and the state of the world changes. Some of those actions might be: see if that movie exists, find the movie, reading it from the data store, do encoding decoding and return this result to **"Respond,"** which relays, streams the information to whoever is executing this story.

The role of **"Prepare"** is to figure out how to prepare the required input, which Handler needs. For example, in this scenario, maybe Handler needs the following:

- Which movie
- Which user
- Which location

Once prepare is done, in PAHR strategy, **"Authorize"** is called, which is also supposed to execute some level of business logic like:

- Is this user permitted to watch the requested movie
- Is it legal to watch from the current user's location

Though the above logic can be easily fit into Handler itself, we forced ourselves to take it out of Handler and make it explicit because we want developers and product owners to think about these steps carefully and independently. After all, Authorize is responsible for permitting the actual execution, and ignoring this introduces a significant security risk. But negatives aside, this adds much-needed scalability to applications from a business sense, too, enabling to add different kinds of subscriptions or purchases in just one phase. Permissions are critical for many applications, and it has to scale independently along with new logic which keeps coming into applications.

Now that you have got an idea about four phases let's briefly discuss these in the PAHR sequence. Let's talk in the context of an API call like:

```
GET /api/movies/no-time-to-die
Authorization: Bearer jdsfdsfd...dsfdsfdsf
```

**Prepare**: Irrespective of which programming language, the framework you use, you need to read the input from URL, headers, IP Address.

- From URL, you want to identify the requested movie
- From Headers, you want to identify the user, user-agent.
- From IP Address, the Location

**Authorize**: It's a decision point. Based on the result of "prepare," you want to authorize or deny the HTTP API request right here and not go ahead.

**Handle**: The input to this phase is the result of "Prepare." So, for example, you might be storing the movie file in someplace, and you want to fetch it, but also figure out based on location/network used which quality of the movie you want to stream back.

**Respond**: Based on the result of "Handle," you want to figure how to encode/decode the file and give it back to HTTP call or give some instruction for the frontend to follow.

PAHR is more of a methodology to think and prepare a solution. And NobeJS helps you put together the same via breaking down each phase as a single function and passing down results from one function to another. As a result, PAHR improves code readability, maintainability drastically. And taking the "Test-First" approach makes testing a first citizen rather than additional work. Sometimes, you might feel there is no need to open Postman and call an API call to try the endpoint.
