steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE users
        ADD first_name VARCHAR(50) NOT NULL,
        ADD last_name VARCHAR(50) NOT NULL,
        ADD email VARCHAR(100) NOT NULL,
        ADD phone_number VARCHAR(20) NOT NULL,
        ADD age INT NOT NULL;
        """,
        # "Down" SQL statement
        """
        DROP COLUMN first_name VARCHAR(50) NOT NULL,
        DROP COLUMN last_name VARCHAR(50) NOT NULL,
        DROP COLUMN email VARCHAR(100) NOT NULL,
        DROP COLUMN phone_number VARCHAR(20) NOT NULL,
        DROP COLUMN age INT NOT NULL;
        """
    ],
]
