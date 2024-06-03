steps = [
    [
        """
        CREATE TABLE pool_amenities AS
        SELECT a.name AS amenity_name,
            a.id AS amenity_id,
            p.id AS pool_id
        FROM amenities AS a
        INNER JOIN pools AS p ON a.id = p.id;
        """,
        """
        DROP TABLE pool_amenities;
        """
    ],
]
