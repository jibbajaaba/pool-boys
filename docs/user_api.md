### Signup a user

* Endpoint path: /api/signup
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
        {
        "username": str,
        "password": str,
        "first_name": str,
        "last_name": str,
        "email": str,
        "phone_number": str,
        "age": 0
        }
    ```

* Response: A logged in User
* Response shape (JSON):
    ```json
        {
        "id": int,
        "username": str
        }
    ```

### Signin a user

* Endpoint path: /api/signin
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
        {
        "username": str,
        "password": str,
        }
    ```

* Response: A logged in User
* Response shape (JSON):
    ```json
        {
        "id": int,
        "username": str
        }
    ```
