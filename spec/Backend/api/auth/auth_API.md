# π Auth API

## User Schema

```
id : integer,
email: string,
name : string,
password : string
```

<br>

### β _POST_ /auth/signup

<details>
<summary>click!</summary>
<div markdown="1">

: νμκ°μ

**μμ²­**

```
{
    email, password, name
}
```

**μλ΅** : 201 | 409

</div>
</details>

<br>

### β _POST_ /auth/login

<details>
<summary>click!</summary>
<div markdown="1">

: λ‘κ·ΈμΈ

**μμ²­**

```
{
    email, password
}
```

**μλ΅** : 202 | 401

```
{
    token, username
}
```

</div>
</details>

<br>

### β _POST_ /auth/logout

<details>
<summary>click!</summary>
<div markdown="1">

: λ‘κ·Έμμ

**μλ΅** : 200

</div>
</details>

<br>

### β _GET_ /auth/me

<details>
<summary>click!</summary>
<div markdown="1">

: λ‘κ·ΈμΈ μν

**μλ΅** : 200 | 401

```
{
    token, username
}
```

</div>
</details>
