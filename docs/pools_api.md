### Get list of pools

* Endpoint path: /api/pools
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Pools
* Response shape (JSON):
    ```json
    {
      "pools": [
        {
          "id": int,
          "hourly_rate": int,
          "pic_url": str,
          "restroom": default=false boolean,
          "pariking": default=false boolean,
          "heated": default=false boolean,
          "ada_complient": default=false boolean,
          "alcohol": default=false boolean,
          "description": text,
        }
      ]
    }
    ```

### Create a pool

* Endpoint path: /api/pools
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
        {
          "hourly_rate": int,
          "pic_url": str,
          "restroom": default=false boolean,
          "pariking": default=false boolean,
          "heated": default=false boolean,
          "ada_complient": default=false boolean,
          "alcohol": default=false boolean,
          "description": text,
        }
    ```

* Response: An indication of success or failure
* Response shape (JSON):
    ```json
        {
          "id": int,
          "hourly_rate": int,
          "pic_url": str,
          "restroom": default=false boolean,
          "pariking": default=false boolean,
          "heated": default=false boolean,
          "ada_complient": default=false boolean,
          "alcohol": default=false boolean,
          "description": text,
          "owner": {
            "id": int,
            "first_name": string,
            "last_name": string
          }
        }
    ```

### Update pool

* Endpoint path: /api/pools/<id>
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
        {
          "hourly_rate": int,
          "pic_url": str,
          "restroom": default=false boolean,
          "pariking": default=false boolean,
          "heated": default=false boolean,
          "ada_complient": default=false boolean,
          "alcohol": default=false boolean,
          "description": text,
        }
    ```

* Response: An indication of success or failure
* Response shape (JSON):
    ```json
      {
        "id": int,
        "hourly_rate": int,
        "pic_url": str,
        "restroom": default=false boolean,
        "pariking": default=false boolean,
        "heated": default=false boolean,
        "ada_complient": default=false boolean,
        "alcohol": default=false boolean,
        "description": text,
        "owner": {
          "id": int,
          "first_name": string,
          "last_name": string
        }
      }
    ```


### Get One pool

* Endpoint path: /api/pools/<id>
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
        {
          "id": int
        }
    ```

* Response: A single pool instance
* Response shape (JSON):
    ```json
      {
        "id": int,
        "hourly_rate": int,
        "pic_url": str,
        "restroom": default=false boolean,
        "pariking": default=false boolean,
        "heated": default=false boolean,
        "ada_complient": default=false boolean,
        "alcohol": default=false boolean,
        "description": text,
        "owner": {
          "id": int,
          "first_name": string,
          "last_name": string
        }
      }
    ```

### Delete a pool

* Endpoint path: /api/pools/<id>
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
  ```json
      {
        "id": int
      }
  ```

* Response: An indication of success or failure
* Response shape (JSON):
    ```json
        {
          "success": boolean,
        }
    ```
