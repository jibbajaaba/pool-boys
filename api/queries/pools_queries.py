"""
Database Queries for Pools
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.pools import PoolIn, PoolOut, PoolUpdate, GetPools
from utils.exceptions import PoolsDatabaseException
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PoolQueries:
    def get_all_pools(self):
        """
        Fetches all pools from the database
        and returns them as an iterable of PoolOut objects.
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(GetPools)) as cur:
                    cur.execute("SELECT * FROM pools;")
                    return cur.fetchall()
        except psycopg.Error as e:
            print(e)
            raise PoolsDatabaseException("Error getting all pools")

    def create_pool(
        self,
        new_pool: PoolIn,
        poolowner_id: int,
    ) -> PoolOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(PoolOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO pools (
                            picture_url,
                            address,
                            description,
                            hourly_rate,
                            number_guests,
                            poolowner_id
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            new_pool.picture_url,
                            new_pool.address,
                            new_pool.description,
                            new_pool.hourly_rate,
                            new_pool.number_guests,
                            poolowner_id
                        ],
                    )
                    pools = cur.fetchone()
                    if not pools:
                        raise PoolsDatabaseException(
                            "Could not create pool"
                        )
        except psycopg.Error:
            raise PoolsDatabaseException(
                "Could not create pool"
            )
        return pools

    def get_by_poolowner_id(
            self, id: int, poolowner_id: int
            ) -> Optional[PoolOut]:
        """
        Gets a pool from the database by poolowner_id

        Returns None if the pool isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(PoolOut)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM pools
                            WHERE id = %s
                            AND poolowner_id = %s
                            """,
                        [id, poolowner_id],
                    )
                    pools = cur.fetchone()
                    if not pools:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with \
                                        {poolowner_id}")
        return pools

    def delete_pool(
        self,
        pool_id: int,
        poolowner_id: int
    ) -> PoolOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                            DELETE FROM pools
                            WHERE id = %s AND poolowner_id = %s
                            """,
                        [pool_id, poolowner_id],
                    )
                if not result:
                    return {"success": False, "message": "Pool not found"}
                return True
        except psycopg.Error:
            raise PoolsDatabaseException(
                "Could not delete pool")

    def update_pool(
            self,
            pool_id: int,
            pools: PoolIn,
            poolowner_id: int
    ) -> PoolUpdate:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        UPDATE pools
                        SET picture_url = %s,
                            address = %s,
                            description = %s,
                            hourly_rate = %s,
                            number_guests = %s
                        WHERE id = %s AND poolowner_id = %s
                        """,
                        [
                            pools.picture_url,
                            pools.address,
                            pools.description,
                            pools.hourly_rate,
                            pools.number_guests,
                            pool_id,
                            poolowner_id
                        ]
                    )
                if cur.rowcount == 0:
                    return False
                pool_dict = pools.dict()
                return PoolUpdate(
                    id=pool_id,
                    poolowner_id=poolowner_id,
                    **pool_dict)
        except psycopg.Error:
            raise PoolsDatabaseException("Could not update pool")
