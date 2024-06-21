
### Create a reservation

* Endpoint path: /api/reservations
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
      {
        "pool_id": int,
        "start_time": date/time,
        "end_time": date/time
      }
    ```

* Response: A reservation object
* Response shape (JSON):
    ```json
      {
        "id": int,
        "start_time": date/time,
        "end_time": date/time,
        "pool_id": int,
        "user_id": int
      }
    ```

### Get list of reservations

* Endpoint path: /api/reservations
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of reservations
* Response shape (JSON):
    ```json
      [
        {
          "id": int,
          "start_time": date/time,
          "end_time": date/time,
          "pool_id": int,
          "user_id": int
        }
      ]
    ```

### Get a reservations

* Endpoint path: /api/reservations/<id>
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A reservations
* Response shape (JSON):
    ```json
      {
        "id": int,
        "start_time": date/time,
        "end_time": date/time,
        "pool_id": int,
        "user_id": int
      }
    ```

### Delete a pool

* Endpoint path: /api/reservation/<id>
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

### Get list of reservations by pool id

* Endpoint path: /api/pools/<id>/reservations
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of reservations
* Response shape (JSON):
    ```json
      [
        {
          "id": int,
          "start_time": date/time,
          "end_time": date/time,
          "pool_id": int,
          "user_id": int
        }
      ]
    ```
