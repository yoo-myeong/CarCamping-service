# ๐ Shop API ์คํ

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

### โ _GET_ /shop

<details>
<summary>click !</summary>
<div markdown="1">

: ๋ชจ๋  ๋งค๋ฌผ ๊ฐ์ ธ์ค๊ธฐ

**์๋ต** : 200

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

### โ _GET_ /shop/:id

<details>
<summary>click !</summary>
<div markdown="1">

: ํน์  ๋งค๋ฌผ ๊ฐ์ ธ์ค๊ธฐ

**์๋ต** : 200

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

### โ _POST_ /shop

<details>
<summary>click !</summary>
<div markdown="1">

: ํ๋งค๊ธ ๊ฒ์

**์์ฒญ**

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

**์๋ต** : 201 | 409

```
{
    shopId
}
```

</div>
</details>

<br>

<br>

### โ _DELETE_ /shop/:id

<details>
<summary>click !</summary>
<div markdown="1">

: ํน์  ํ๋งค๊ธ ์ญ์ 

**์์ฒญ**

**์๋ต** : 204 | 409

```
{ userId }
```

</div>
</details>

<br>

<br>

### โ _GET_ /shop/author/:id

<details>
<summary>click !</summary>
<div markdown="1">

**์๋ต** : 200

```
{
    userId,
    IsAuthor,
}
```

</div>
</details>
