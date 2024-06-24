steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE pools (
            id SERIAL PRIMARY KEY NOT NULL,
            picture_url VARCHAR(255) NOT NULL,
            address TEXT NOT NULL,
            description TEXT NOT NULL,
            hourly_rate INT NOT NULL,
            number_guests INT NOT NULL,
            poolowner_id INT NOT NULL,
            FOREIGN KEY (poolowner_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE pools;
        """
    ],
]
