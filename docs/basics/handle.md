# Handle

### About

"Handle" is the core of the Story. This is where you actually implement the story and return result.

### Example

```js
const handle = async ({ prepareResult }) => {
  return await TeamMemberRepo.getTeamsAndMembers({
    "team_members.team_uuid": prepareResult.team_uuid,
  });
};
```

In the above example, we basically are fetching members of a Team. The neatness of the function might give you an idea on how PAHR helps here:

- If someone is authorized to get members etc., is decided by authorize phase already
- How "team_uuid" is read from interface is handled by prepareResult already
- So, handle's jobs is only to be the core worker and do it's job well.