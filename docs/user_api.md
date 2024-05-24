### Get list of pools

* Endpoint path: /api/signup
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    {
        "email": string,
        "first_name": string,
        "last_name": stirng,
        "address": string,
        "password": string,
        "password_confirmation": string,
        "avatar": url_picture,
        "description": text,
    }
    ```

* Response: A list of Pools
* Response shape (JSON):
    ```json
    {
        "id": int,
        "email": string,
        "first_name": string,
        "last_name": stirng,
        "address": string,
        "password": string,
        "password_confirmation": string,
        "avatar": url_picture,
        "description": text,
    }
    ```
