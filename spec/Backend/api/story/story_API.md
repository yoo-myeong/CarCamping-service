# ๐ story API ์คํ

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

### โ _GET_ /story

### โ _GET_ /stroy?username=:username

### โ _GET_ /stroy?search=:address

### โ _GET_ /stroy?sort=:asc || desc

<details>
<summary>click !</summary>
<div markdown="1">

: ์กฐ๊ฑด์ ์ผ์นํ๋ ๋ชจ๋  ์คํ ๋ฆฌ์ ์ผ๋ถ ๋ฐ์ดํฐ ๊ฐ์ ธ์ค๊ธฐ

**์๋ต** : 200

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
    storyImages : [{ imgname }]  <= 1๊ฐ
  }
  ...
]
```

</div>
</details>

<br>

<br>

### โ _GET_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: id๊ฐ ์ผ์นํ๋ ์คํ ๋ฆฌ์ ์์ธ ๋ฐ์ดํฐ ๊ฐ์ ธ์ค๊ธฐ

**์๋ต** : 200

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

### โ _POST_ /story

<details>
<summary>click !</summary>
<div markdown="1">

: ์๋ก์ด story ์์ฑ

**์์ฒญ**

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

**์๋ต** : 201

```
{
  storyId
}
```

</div>
</details>

<br>

<br>

### โ _PUT_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: ๋ฐ์ดํฐid๋ฅผ ๊ฐ์ง ์คํ ๋ฆฌ์ ๋ด์ฉ๊ณผ ์ฐ๊ฒฐ๋ ์ด๋ฏธ์ง ์์ 

**์์ฒญ**

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

**์๋ต** : 201

```
{
  storyId
}
```

</div>
</details>

<br>

<br>

### โ _DELETE_ /story/:id

<details>
<summary>click !</summary>
<div markdown="1">

: ๋ฐ์ดํฐid๋ฅผ ๊ฐ์ง ์คํ ๋ฆฌ์ ์ฐ๊ฒฐ๋ ์ด๋ฏธ์ง ์ ์ฒด ์ญ์ 

**์๋ต** : 204

</div>
</details>

<br>

<br>

### โ _GET_ /story/author/:id

<details>
<summary>click !</summary>
<div markdown="1">

: token์ userId์ ์์ ํ๋ ค๋ story์ userId๊ฐ ์ผ์นํ๋ ์ง ์ฒดํฌ

**์๋ต**
200 | 401

</div>
</details>

<br>

<br>
