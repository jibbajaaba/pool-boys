steps = [
    [
        """
        CREATE TABLE pool_amenities (
        amenity_id INT NOT NULL,
            FOREIGN KEY (amenity_id) REFERENCES amenities(id),
        pool_id INT NOT NULL,
            FOREIGN KEY (pool_id) REFERENCES pools(id)
        )

        """,
        """
        DROP TABLE pool_amenities;
        """
    ],
]
