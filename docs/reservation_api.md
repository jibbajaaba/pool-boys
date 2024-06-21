
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

* Response: A list of reservations
* Response shape (JSON):
    ```json
      {
        "id": 0,
        "start_time": "2024-06-21T15:30:26.403Z",
        "end_time": "2024-06-21T15:30:26.403Z",
        "pool_id": 0,
        "user_id": 0
      }
    ```
