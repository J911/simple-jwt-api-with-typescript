# simple-jwt-api-with-typescript
simple jwt authentication server

[제이구일일의 개발 블로그](https://j911.me)의 [타입스크립트와 JWT로 인증 API 구축하기](https://j911.me/2018/09/build-jwt-auth-api-with-typescript.html)에서 다룬 예제입니다.

## 이 프로젝트에서 작성된 api의 명세

### Auth

#### Sign In
로그인을 통해 JWT 인증토큰을 받아온다.

- uri: /api/v1/auth/sign-in
- method: POST
- request: userName, password
- response: token, username
- status: 200, 400, 403, 500

#### Sign Up
새로운 사용자를 등록한다.

- uri: /api/v1/auth/sign-up
- method: POST
- request: userName, password
- status: 201, 500, 409

### Accounts

#### Get UserName
사용자 정보를 가져운다.

- uri: /api/v1/accounts/${userId}
- method: GET
- request header: x-access-token
- response: userId, userName
- status: 200, 401, 403, 500

#### Update Password
사용자 비밀번호를 변경한다.

- uri: /api/v1/accounts/${userId}/password
- method: PUT
- request header: x-access-token
- request: userId, password, newPassword
- status: 204, 400, 401, 403, 500

#### Update UserName
사용자 이름을 수정한다.

- uri: /api/v1/accounts/${userId}/username
- method: PUT
- request header: x-access-token
- request: userId, password, newUserName
- status: 204, 400, 401, 403, 409, 500

#### Delete User Account
비밀번호 인증을 통해 사용자를 삭제한다.

- uri: /api/v1/accounts/${userId}
- method: DELETE
- request header: x-access-token
- request: userId, password
- status: 204, 400, 401, 403, 500

