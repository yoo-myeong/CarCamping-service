# 👉 story/heart API 스펙

## storyHeart Schema

```
id : integer
userId : integer, fk
StoryId : integer, fk
```

<br>

### ✅ _GET_ /story/heart/:storyId

    - userId, storyId = id 인 행이 있는 지 확인

**응답** : 200 | 404

```
{
  heartCnt
}
```

<br>

### ✅ _POST_ /story/heart

- 하트 추가

  **요청**

```
{
  storyId
}
```

**응답** : 201 | 400

```
{
  heartCnt
}
```

<br>

### ✅ _DELETE_ /story/heart/:storyId

- 하트 삭제

**응답** : 200 | 404

```
{
  heartCnt
}
```

### ✅ _GET_ /story/heart/stories

    - 하트 개수가 많은 순으로 정렬해서 story 데이터 전달

**응답** : 200 | 404

```
[
  {
    title,
    address,
    id,
    createdAt,
    user : {
      name
    },
    storyImages : [{ imgname }]  <= 1개
  }
  ...
]
```
