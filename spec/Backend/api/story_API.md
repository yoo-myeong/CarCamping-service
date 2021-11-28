# 👉 story API 스펙

## Story Schema

```
id : integer,
title: string,
address : string,
waytogo : text,
knowhow : text,
createdAt : datetime,
updatedAt : datetime,
userId : integer, fk
```

## storyImage Schema

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
{tumbnail, title, address, storyId, createdAt, name} ...
]
```

<br>

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

<br>

### ✅ _GET_ /story/:id

- 특정 스토리의 디테일 페이지 데이터 가져오기

**응답** : 200

```
{
  story : {
            title,
            createdAt,
            address,
            waytogo,
            knowhow,
            { user : {name} }
          } ,
  imgnames : []
}
```

<br>

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

<br>

### ✅ _PUT_ /story/:id

- 데이터id를 가진 스토리의 내용과 연결된 이미지 수정

**요청**

```
{
  title, address, waytogo, knowhow,
  deleteImgnames : [],
  imgnames : [],
}
```

**응답** : 201

```
{
  storyId
}
```

<br>

### ✅ _DELETE_ /story/:id

- 데이터id를 가진 스토리와 연결된 이미지 전체 삭제

**응답** : 204

<br>

### ✅ _GET_ /story/author/:id

- token의 userId와 수정하려는 story의 userId가 일치하는 지 체크

**응답**
200 | 401

<br>
