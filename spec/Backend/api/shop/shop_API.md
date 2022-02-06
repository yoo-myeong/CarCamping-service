# 👉 Shop API 스펙

## Shop Schema

```
id : integer,
stuff : string,
price : integer,
mobile : string,
description : text,
transtype : string,
transaction : string,
createdAt : DateTime,
updatedAt : DateTime
```

## shopImage Schema

```
id : integer
imgname : string,
ShopId : integer, fk
```

### ✅ _GET_ /shop

<details>
<summary>click !</summary>
<div markdown="1">

: 모든 매물 가져오기

**응답** : 200

```
[
    {
        "id",
        "stuff"",
        "price",
        "mobile",
        "transaction",
        "description",
        "transtype",
        "createdAt",
        "user": {
            "name"
        },
        "shopImages": [
            {
                "imgname"
            }
        ]
    }
]
```

</div>
</details>

<br>

<br>

### ✅ _GET_ /shop/:id

<details>
<summary>click !</summary>
<div markdown="1">

: 특정 매물 가져오기

**응답** : 200

```
{
    "id",
    "stuff",
    "price",
    "mobile",
    "transaction",
    "description",
    "transtype",
    "createdAt",
    "userId",
    "shopImages": [
        {
            "imgname"
        }, ...
    ],
    "user": {
        "name"
    }
}
```

</div>
</details>

<br>

<br>

### ✅ _POST_ /shop

<details>
<summary>click !</summary>
<div markdown="1">

: 판매글 게시

**요청**

```
{
    stuff,
    price,
    mobile,
    transaction,
    description,
    transtype,
    imgnames : []
}
```

**응답** : 201 | 409

```
{
    shopId
}
```

</div>
</details>

<br>

<br>

### ✅ _DELETE_ /shop/:id

<details>
<summary>click !</summary>
<div markdown="1">

: 특정 판매글 삭제

**요청**

**응답** : 204 | 409

```
{ userId }
```

</div>
</details>

<br>

<br>

### ✅ _GET_ /shop/author/:id

<details>
<summary>click !</summary>
<div markdown="1">

**응답** : 200

```
{
    userId,
    IsAuthor,
}
```

</div>
</details>
