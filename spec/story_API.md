# 👉 story API 스펙 설계

## Story Schema

```
id : integer,
title: string,
address : string,
waytogo : text,
knowhow : text,
userId : integer, fk
```

## Image Schema

```
id : integer
imgname : string,
StoryId : integer, fk
```

<br>

### ✅ _GET_ /story

- 모든 스토리 가져오기

**응답** : 200

```
[
  {tumbnail, title, address, storyId} ...
]
```

### ✅ _GET_ /stroy?name=:name

- 유저네임의 스토리 모두 가져오기

**응답** : 200

```
[
  {
    imgnames : [],
    title, address, storyId, createdAt, name
  } ...
]
```

story

### ✅ _GET_ /story/:id

- 특정 스토리의 디테일 페이지 데이터 가져오기

**응답** : 200

```
{
  story : {
            ...user,
          }
  imgnames : []
}
```

### ✅ _POST_ /story

- 새로운 story 생성

**요청**

```
{
    title, address, waytogo, knowhow,
    imgnames : []
}
```

**응답** : 201

```
{
    storyId
}
```

### ✅ _PUT_ /story/:id

- 데이터id를 가진 스토리의 내용과 연결된 이미지 수정

**요청**

```
{
    title, address, waytogo, knowhow,
    imagenames : [],
}
```

**응답** : 201

```
{
    storyId
}
```

### ✅ _DELETE_ /tweets/:id

- 데이터id를 가진 스토리와 연결된 이미지 전체 삭제
- **응답** : 204
