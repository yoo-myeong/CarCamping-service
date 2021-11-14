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
- 응답 : 200

  ```
  [
    {imagename, title, address, storyId} ...
  ]
  ```

### ✅ _GET_ /stroy?name=:name

- 유저네임의 스토리 모두 가져오기
- 응답 : 200

  ```
  [
    {imagename, title, address, storyId} ...
  ]
  ```

  story

### ✅ _GET_ /story/:id

- StoryId 스토리 가져오기
- 응답 : 200

  ```
  {
      [
        story,
        [
          imgname, ...
        ]
      ]
  }
  ```

### ✅ _POST_ /story

- 새로운 story 생성

  **요청** : 200

  ```
  {
      address, waytogo, knowhow, imagenames
  }
  ```

  **응답** : 201

  ```
  {
      storyId
  }
  ```

### ✅ _PUT_ /story/:id

- 데이터id를 가진 트윗의 내용 수정

  **요청** : 200

  ```
  {
      address, waytogo, knowhow, img
  }
  ```

  **응답** : 201

  ```
  {
      story
  }
  ```

### ✅ _DELETE_ /tweets/:id

- 데이터id를 가진 트윗 전체 삭제

  **요청**

  ```
  넘기는 데이터 없음
  ```

  **응답** : 204

  ```
  넘기는 데이터 없음
  ```
