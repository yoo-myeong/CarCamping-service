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

```
{
    token, name
}
```

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
    token, name
}
```

<br>

### ✅ _GET_ /auth/me

- 로그인상태

**요청**

```
header에 token 담아서 요청
```

**응답** : 200 | 401

```
{
    name
}
```
