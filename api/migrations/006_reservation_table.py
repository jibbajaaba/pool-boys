steps = [
    [
        # "Up" SQL Statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY,
            date DATE NOT NULL,
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            pool_id INT NOT NULL,
            users_id INT NOT NULL,
            FOREIGN KEY (pool_id) REFERENCES pools(id),
            FOREIGN KEY (users_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL Statement
        """
        DROP TABLE reservations;
        """
    ],
]
