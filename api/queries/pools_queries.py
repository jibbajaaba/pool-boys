"""
Database Queries for Pools
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from models.users import UserWithPw, UserRequest
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PoolQueries:

    def create_pool(
        self,
        new_user: UserRequest,
        hashed_password: str,
    ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            first_name,
                            last_name,
                            email,
                            phone_number,
                            age

                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            new_user.username,
                            hashed_password,
                            new_user.first_name,
                            new_user.last_name,
                            new_user.email,
                            new_user.phone_number,
                            new_user.age,
                        ],
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user \
                            with username{new_user.username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {new_user.username}"
            )
        return user
