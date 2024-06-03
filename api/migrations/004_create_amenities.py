steps = [
    [
        # "Up" SQL Statement
        """
        CREATE TABLE amenities (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL
        );
        INSERT INTO amenities(name)
        VALUES
            ('ADA'),
            ('Restroom'),
            ('Alcohol'),
            ('Heated Pool'),
            ('Parking')
        """,
        # "Down" SQL Statement
        """
        DROP TABLE amenities;
        """
    ],
]
