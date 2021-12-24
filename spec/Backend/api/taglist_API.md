## taglist Schema

```
id : integer
tagname : string
```

<br>

### ✅ _GET_ /taglist

- 모든 태그 가져오기

**응답** : 200

```
[ { "tagname" }, ... ]
```

<br>

### ✅ _POST_ /taglist

- 태그 추가

**요청**

```
{ "tagname" }
```

**응답** : 201

<br>

### ✅ _DELETE_ /taglist/:name

- 태그 삭제

**응답** : 204
