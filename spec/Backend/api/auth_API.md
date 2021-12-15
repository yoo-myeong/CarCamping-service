# 👉 Auth API

## User Schema

```
id : integer,
email: string,
name : string,
password : string
```

<br>

### ✅ _POST_ /auth/signup

- 회원가입

**요청**

```
{
    email, password, name
}
```

**응답** : 201 | 409

<br>

### ✅ _POST_ /auth/login

- 로그인

**요청**

```
{
    email, password
}
```

**응답** : 202 | 401

```
{
    token, username
}
```

<br>

### ✅ _POST_ /auth/logout

**응답** : 200

<br>

### ✅ _GET_ /auth/me

- 로그인상태

**응답** : 200 | 401

```
{
    token, username, userId
}
```
