### Get list of pools

* Endpoint path: /api/pools
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Pools
* Response shape (JSON):
    ```json
      [
        {
          "id": int,
          "poolowner_id": int,
          "picture_url": str,
          "address": str,
          "description": str,
          "hourly_rate": int,
          "number_guests": int
        }
      ]
    ```

### Create a pool

* Endpoint path: /api/pools
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
        {
          "picture_url": str,
          "address": str,
          "description": str,
          "hourly_rate": int,
          "number_guests": int,
          "amenities_ids": [
            int
          ]
        }
    ```

* Response: An indication of success or failure
* Response shape (JSON):
    ```json
          {
            "id": int,
            "poolowner_id": int,
            "picture_url": str,
            "address": str,
            "description": str,
            "hourly_rate": int,
            "number_guests": int
          }
    ```

### Update pool

* Endpoint path: /api/pools/<pool_id>
* Endpoint method: PUT

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
        {
          "picture_url": str,
          "address": str,
          "description": str,
          "hourly_rate": int,
          "number_guests": int,
          "amenities_ids": [
            int
          ]
        }
    ```

* Response: An indication of success or failure
* Response shape (JSON):
    ```json
      {
        "picture_url": str,
        "address": str,
        "description": str,
        "hourly_rate": int,
        "number_guests": int,
        "amenities_ids": [
          int
        ],
        "id": int,
        "poolowner_id": int
      }
    ```


### Get One pool

* Endpoint path: /api/pools/<pool_id>
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
        "picture_url": str,
        "address": str,
        "description": str,
        "hourly_rate": int,
        "number_guests": int,
        "amenities_ids": [
          int
        ],
        "id": int,
        "poolowner_id": int
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

### Get list of poolowner pools

* Endpoint path: /api/pools/mine
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Pools by poolowner
* Response shape (JSON):
    ```json
      [
        {
          "id": 1,
          "poolowner_id": 1,
          "picture_url": "string",
          "address": "string",
          "description": "string",
          "hourly_rate": 0,
          "number_guests": 0
        },
      ]
    ```
