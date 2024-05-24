
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
          "username": email
        }
      ]
    }
    ```
