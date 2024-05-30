"""
Database Queries for Pools
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
# from typing import Optional
from models.pools import PoolIn, PoolOut
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PoolQueries:
    def create_pool(
        self,
        new_pool: PoolIn,
        user_id: int,
    ) -> PoolOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(PoolOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO pools (
                            picture_url,
                            address,
                            dates_available,
                            description,
                            hourly_rate,
                            number_guests,
                            poolowner_id

                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            new_pool.picture_url,
                            new_pool.address,
                            new_pool.dates_available,
                            new_pool.description,
                            new_pool.hourly_rate,
                            new_pool.number_guests,
                            new_pool.poolowner_id
                            
                        ],
                    )
                    pools = cur.fetchone()
                    if not pools:
                        raise UserDatabaseException(
                            "Could not create pool"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                "Could not create pool"
            )
        return pools
