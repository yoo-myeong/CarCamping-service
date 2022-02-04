# 👉 story API 스펙

## Story Schema

```
id : integer,
title: string,
address : string,
campsite : string,
campsite_startTime : string,
campsite_endTime : string,
campsite_link : string,
campsite_price : integer,
description : text,
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

## storyTag Schema

```
id : integer
tag : string,
StoryId : integer, fk
```

<br>

### ✅ _GET_ /story

### ✅ _GET_ /stroy?username=:username

### ✅ _GET_ /stroy?search=:address

### ✅ _GET_ /stroy?sort=:asc || desc

<details>
<summary>click !</summary>
<div markdown="1">

: 조건에 일치하는 모든 스토리의 일부 데이터 가져오기

**응답** : 200

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

</div>
</details>

<br>

<br>

### ✅ _GET_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: id가 일치하는 스토리의 상세 데이터 가져오기

**응답** : 200

```
{
    "title",
    "address",
    "campsite",
    "campsite_startTime",
    "campsite_endTime",
    "campsite_price",
    "campsite_link",
    "description",
    "createdAt",
    "user": { "name" },
    "storyTags": [ { "tag" }, ... ],
    "storyImages": [ { "imgname" }, ... ]
}
```

</div>
</details>

<br>

<br>

### ✅ _POST_ /story

<details>
<summary>click !</summary>
<div markdown="1">

: 새로운 story 생성

**요청**

```
{
    "title",
    "address",
    "campsite",
    "campsite_startTime",
    "campsite_endTime",
    "campsite_price",
    "campsite_link",
    "tags" : V or [ V, ...]
    "description" ,
    "imgnames" : []
}
```

**응답** : 201

```
{
  storyId
}
```

</div>
</details>

<br>

<br>

### ✅ _PUT_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: 데이터id를 가진 스토리의 내용과 연결된 이미지 수정

**요청**

```
{
  title,
  address,
  campsite,
  campsite_startTime,
  campsite_endTime,
  campsite_price,
  campsite_link,
  description,
  tags: V or [V ...],
  imgnames: [],
  deleteImgnames: []
}
```

**응답** : 201

```
{
  storyId
}
```

</div>
</details>

<br>

<br>

### ✅ _DELETE_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: 데이터id를 가진 스토리와 연결된 이미지 전체 삭제

**응답** : 204

</div>
</details>

<br>

<br>

### ✅ _GET_ /story/author/:id

<details>
<summary>click !</summary>
<div markdown="1">

: token의 userId와 수정하려는 story의 userId가 일치하는 지 체크

**응답**
200 | 401

</div>
</details>

<br>

<br>
