## shopReply Schema

```
id : integer
shopId : integer, fk
userId : integer, fk
content : text
createdAt : DateTime
```

<br>

### ✅ _GET_ /shop/reply/:shopId

- 해당 품목의 댓글 가져오기

**응답** : 200

```
{
    [
        {
            createdAt,
            content,
            user : {name},
        },
        ...
    ]
}
```

<br>

### ✅ _POST_ /shop/reply

- 댓글 생성

**요청**

```
{
    shopId,
    content
}
```

**응답** : 201 | 409

<br>
