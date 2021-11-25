# 👉 Shop API

## Shop Schema

```
id : integer,
stuff : string,
price : integer,
mobile : string,
description : text,
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

<br>

### ✅ _GET_ /shop

- 모든 매물 가져오기

  **응답** : 200

  ```
  {
      thumbnail, transaction, price, createdAt,
      user : { name  }
  }
  ```

<br>

### ✅ _GET_ /shop/:id

- 특정 매물 가져오기

  **응답** : 200

  ```
  {
      stuff, mobile, createdAt, price, description,
      imgnames : [],
      user : { name  }
  }
  ```

<br>

### ✅ _POST_ /shop

- 판매글 게시

  **요청**

  ```
  {
      stuff, price, mobile, transaction, description,
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

  <br>
