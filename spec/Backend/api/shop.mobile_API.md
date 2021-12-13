## shop_mobile_access Schema

```
id : integer
shopId : integer, fk
userId : integer, fk
```

<br>

### ✅ _GET_ /shop/mobile/:shopId

- 모든 태그 가져오기

**응답** : 200

```
[ { "id", "userId", "shopId" }, ... ]
```

### ✅ _POST_ /shop/mobile.:shopId

- 접근 가능 유저 생성

**요청**

```
{
    "userId"
}
```

**응답** : 201
<br>
