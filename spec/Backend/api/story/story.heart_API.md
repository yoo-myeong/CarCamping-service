# π story/heart API μ€ν

## storyHeart Schema

```
id : integer
userId : integer, fk
StoryId : integer, fk
```

<br>

<br>

### β _GET_ /story/heart/:storyId

<details>
<summary>click !</summary>
<div markdown="1">

: userId, storyId = id μΈ νμ΄ μλ μ§ νμΈ

**μλ΅** : 200 | 404

```
{
  heartCnt
}
```

</div>
</details>

<br>

<br>

### β _POST_ /story/heart

<details>
<summary>click !</summary>
<div markdown="1">

: ννΈ μΆκ°

**μμ²­**

```
{
  storyId
}
```

**μλ΅** : 201 | 400

```
{
  heartCnt
}
```

</div>
</details>

<br>

<br>

### β _DELETE_ /story/heart/:storyId

<details>
<summary>click !</summary>
<div markdown="1">

: ννΈ μ­μ 

**μλ΅** : 200 | 404

```
{
  heartCnt
}
```

</div>
</details>

<br>

<br>

### β _GET_ /story/heart/stories

<details>
<summary>click !</summary>
<div markdown="1">

: ννΈ κ°μκ° λ§μ μμΌλ‘ μ λ ¬ν΄μ story λ°μ΄ν° μ λ¬

**μλ΅** : 200 | 404

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
    storyImages : [{ imgname }]  <= 1κ°
  }
  ...
]
```

</div>
</details>
