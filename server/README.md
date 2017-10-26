# Server API of Mini-Instagram

### List of auth routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/auth/login/   |POST    |Auth to login      | <ul><li>[x] username (string) </li><li>[x] password (string)</li></ul>           |
|/api/auth/register/   |POST    |Register new customer      |<ul><li>[x] name (string) </li><li>[x] username (string) </li><li>[x] email (string)</li><li>[x] password (string)</li></ul>           |
|/api/auth/isAdmin/   |POST    |Check if token role is admin      |<ul><li>[x] token (string) </li> </ul>               |
|/api/auth/loginFB/   |POST    |Auth to login using FB      |<ul><li>[x] accessToken (string) </li><li>[x] fb_id (string) </li> </ul>               |

### List of users routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/users/  |GET     |Read all users data        |-               |
|/api/users/:id  |GET     |Read one user data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/users/  |POST     |Create new user data        |<ul><li>[x] name (string) </li><li>[x] email (string) </li><li>[x] username (string) </li><li>[x] password (string) </li><li>[x] role (string) </li> </ul>                  |
|/api/users/:id  |PUT     |Update one user data        |<ul><li>[x] id (string) </li> </ul> <ul><li>[ ] name (string) </li><li>[ ] username (string) </li><li>[ ] email (string) </li><li>[ ] password (string) </li><li>[ ] role (string) </li></ul>                 |
|/api/users/:id  |DELETE     |Delete one user data        |<ul><li>[x] id (string) </li> </ul>                  |

### List of posts routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/posts/  |GET     |Read all posts data        |-               |
|/api/posts/:id  |GET     |Read one post data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/posts/ |POST |Create new post | <ul><li>[x] imageFile (file) </li><li>[x] posted_by (string)*jwttoken </li><li>[x] post (string) </li> </ul>                  |
|/api/posts/:id |PUT |Update post | <ul><li>[ ] imageFile (file) </li><li>[ ] post (string) </li> </ul>                  |
|/api/posts/:id  |DELETE     |Delete one post data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/posts/addComment/:id  |POST     |Add one comment to one post data        |<ul><li>[x] id (string) </li><li>[x] user (string)*jwttoken </li><li>[x] comment (string) </li> </ul>                  |
|/api/posts/giveLove/:id  |POST     |Add one love to one post data        |<ul><li>[x] id (string) </li><li>[x] user (string)*jwttoken </li> </ul>                  |
