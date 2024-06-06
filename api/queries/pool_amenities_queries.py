import os
import psycopg
from psycopg_pool import ConnectionPool


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PoolAmenitiesQueries:
    def create_pool_amenity(self, pool_id: int, amenity_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        INSERT INTO pool_amenities (pool_id, amenity_id)
                        VALUES (%s, %s)
                        """,
                        (pool_id, amenity_id)
                    )
                    conn.commit()
        except psycopg.Error as e:
            print(e)
            raise Exception("Failed to create pool amenity")

    def get_by_pool_id_and_amenity_id(self, pool_id: int, amenity_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT * FROM pool_amenities
                        WHERE pool_id = %s AND amenity_id = %s
                        """,
                        (pool_id, amenity_id)
                    )
                    pool_amenity = cur.fetchone()
                    return pool_amenity
        except psycopg.Error as e:
            print(e)
            raise Exception("Failed to get pool amenity")

    def delete(self, pool_id: int, amenity_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM pool_amenities
                        WHERE pool_id = %s AND amenity_id = %s
                        """,
                        (pool_id, amenity_id)
                    )
                    conn.commit()
                    if cur.rowcount == 0:
                        return False
                    return True
        except psycopg.Error as e:
            print(e)
            raise Exception("Failed to delete pool amenity")

    def get_pool_with_amenities(self, pool_id):
        """
        Returns a list of amenity ids associated with a given pool_id.
        """
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT
                    amenity_id FROM pool_amenities
                    WHERE pool_id = %s;
                    """,
                    (pool_id,)
                )
                amenity_ids = [row[0] for row in cur.fetchall()]
                return amenity_ids

