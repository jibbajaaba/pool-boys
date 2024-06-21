### Get list of amenities

* Endpoint path: /api/pools
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of Pools
* Response shape (JSON):
    ```json
      [
        {
          "id": 0,
          "name": "string"
        }
      ]
    ```

### Get One amenity

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
        "id": 0,
        "name": "string"
      }
    ```
