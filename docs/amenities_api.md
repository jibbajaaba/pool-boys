### Get list of amenities

* Endpoint path: /api/amenities
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

* Response: A list of amenities
* Response shape (JSON):
    ```json
      [
        {
          "id": int,
          "name": str
        }
      ]
    ```

### Get One amenity

* Endpoint path: /api/amenities/<id>
* Endpoint method: GET

* Headers:
  * Authorization: Bearer token

  * Request shape (JSON):
    ```json
        {
          "id": int
        }
    ```

* Response: A single amenity
* Response shape (JSON):
    ```json
      {
        "id": int,
        "name": str
      }
    ```
