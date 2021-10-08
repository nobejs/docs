# Folder Structure

Getting Around Files and Folders

In following we have included the most important folders and files which you are relevant to begin with

```jsx
├── .env.example (You should copy this to .env and configure your database)
├── database (This is where your migrations, repositories, serializers sit)
├── src
│   ├── functions (All the reusable functions sit here)
│   ├── endpoints.js (This is the file where all the api endpoints are listed)
│   └── stories (This is where all the stories sit)
│       └── exampleStory (This is example story)
│           ├── story.js (This is the actual story file)
│           └── tests.spec.js (These have tests required for executing test strategy for your story)
```
