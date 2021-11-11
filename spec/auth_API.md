# 👉 Auth API

<br>

### ✅ _POST_ /auth/signup

- 회원가입

  **요청**

  ```
  {
      email, password, name
  }
  ```

  **응답**

  ```
  {
      token, name
  }
  ```

<br>

### ✅ _POST_ /auth/login

- 로그인

  **요청**

  ```
  {
      email, password
  }
  ```

  **응답**

  ```
  {
      token, name
  }
  ```

<br>

### ✅ _GET_ /auth/me

- 로그인상태

  **요청**

  ```
  {
      token, name
  }
  ```
