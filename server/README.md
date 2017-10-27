# Server API of Mini-Instagram

### List of auth routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/auth/login/   |POST    |Auth to login      | <ul><li>[x] username (string) </li><li>[x] password (string)</li></ul>           |
|/api/auth/register/   |POST    |Register new customer      |<ul><li>[x] name (string) </li><li>[x] username (string) </li><li>[x] email (string)</li><li>[x] password (string)</li></ul>           |
|/api/auth/isAdmin/   |POST    |Check if token role is admin      |<ul><li>[x] token (string) </li> </ul>               |

### List of users routes

| Routes       | Method | Description | Required Param |
|--------------|--------|-------------|----------------|
|/api/users/  |GET     |Read all users data        |-               |
|/api/users/:id  |GET     |Read one users data        |<ul><li>[x] id (string) </li> </ul>                  |
|/api/users/  |POST     |Create new users data        |<ul><li>[x] name (string) </li><li>[x] email (string) </li><li>[x] username (string) </li><li>[x] password (string) </li><li>[x] role (string) </li> </ul>                  |
|/api/users/:id  |PUT     |Update one users data        |<ul><li>[x] id (string) </li> </ul> <ul><li>[ ] name (string) </li><li>[ ] username (string) </li><li>[ ] email (string) </li><li>[ ] password (string) </li><li>[ ] role (string) </li></ul>                 |
|/api/users/:id  |DELETE     |Delete one users data        |<ul><li>[x] id (string) </li> </ul>                  |
