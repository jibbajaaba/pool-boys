import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from models.amenity import AmenityOut
from utils.exceptions import PoolsDatabaseException, AmenitiesDatabaseException


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class AmenitiesQueries:
    def get_amenities_id(
            self,
            id: int
            ):
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(AmenityOut)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM amenities
                            WHERE id = %s
                            """,
                        [id],
                    )
                    amenities = cur.fetchone()
                    if not amenities:
                        return None
                    return amenities
        except psycopg.Error as e:
            print(e)
            raise AmenitiesDatabaseException("Error getting amenity")

    def get_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(AmenityOut)) as cur:
                    cur.execute("SELECT * FROM amenities")
                    return cur.fetchall()
        except psycopg.Error as e:
            print(e)
            raise PoolsDatabaseException("Error getting all amenities")
