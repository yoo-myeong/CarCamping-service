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

<details>
<summary>click!</summary>
<div markdown="1">

: 회원가입

**요청**

```
{
    email, password, name
}
```

**응답** : 201 | 409

</div>
</details>

<br>

### ✅ _POST_ /auth/login

<details>
<summary>click!</summary>
<div markdown="1">

: 로그인

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

</div>
</details>

<br>

### ✅ _POST_ /auth/logout

<details>
<summary>click!</summary>
<div markdown="1">

: 로그아웃

**응답** : 200

</div>
</details>

<br>

### ✅ _GET_ /auth/me

<details>
<summary>click!</summary>
<div markdown="1">

: 로그인 상태

**응답** : 200 | 401

```
{
    token, username
}
```

</div>
</details>
