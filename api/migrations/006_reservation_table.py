steps = [
    [
        # "Up" SQL Statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY,
            start_time TIMESTAMP NOT NULL,
            end_time TIMESTAMP NOT NULL,
            pool_id INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (pool_id) REFERENCES pools(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL Statement
        """
        DROP TABLE reservations;
        """
    ],
]
