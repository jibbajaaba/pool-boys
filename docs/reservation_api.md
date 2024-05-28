
### Get list of pools

* Endpoint path: /api/pools/{pool_id}/reservations
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Pools
* Response shape (JSON):
    ```json
    {
      "reservations": [
        {
          "id": int,
          "first_name": string,
          "last_name": string,
          "date": date,
          "start_time": datetime,
          "end_time": datetime,
          "pool": {
            "id": int
          }
        }
      ]
    }
    ```

### Get a single reservation

* Endpoint path: /api/pools/{pool_id}/reservations/<id>
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
      {
        "id": int
      }
    ```

* Response: A list of Pools
* Response shape (JSON):
    ```json
      {
        "id": int,
        "first_name": string,
        "last_name": string,
        "date": date,
        "start_time": datetime,
        "end_time": datetime,
        "pool": {
          "id": int
        }
      }
    ```

### Post a single reservation

* Endpoint path: /api/pools/{pool_id}/reservations
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
      {
        "first_name": string,
        "last_name": string,
        "date": date,
        "start_time": datetime,
        "end_time": datetime,
        "pool": {
          "id": int
        }
      }
    ```

* Response: A list of Pools
* Response shape (JSON):
    ```json
      {
        "id": int,
        "first_name": string,
        "last_name": string,
        "date": date,
        "start_time": datetime,
        "end_time": datetime,
        "pool": {
          "id": int
        }
      }
    ```

### Delete a single reservation

* Endpoint path: /api/pools/{pool_id}/reservations/<id>
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
      {
        "id": int
      }
    ```

* Response: A list of Pools
* Response shape (JSON):
    ```json
      {
        "success": boolean
      }
    ```
