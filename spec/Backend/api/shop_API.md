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

- 모든 매물 가져오기

**응답** : 200

```
{
    id,
    transaction,
    price,
    createdAt,
    transtype,
    user : { name },
    shopImages : { imgname }
}
```

<br>

### ✅ _GET_ /shop/:id

- 특정 매물 가져오기

**응답** : 200

```
{
    stuff,
    mobile,
    createdAt,
    price,
    description,
    transtype,
    imgnames : ![],
      : { name }
}
```

<br>

### ✅ _POST_ /shop

- 판매글 게시

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

<br>

### ✅ _DELETE_ /shop/:id

- 특정 판매글 삭제

**요청**

**응답** : 204 | 409

```
{ userId }
```

<br>

### ✅ _GET_ /shop/author/:id

**응답** : 200

```
{
    userId,
    IsAuthor,
}
```
