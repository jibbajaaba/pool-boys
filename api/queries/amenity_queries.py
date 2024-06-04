import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from models.amenity import AmenityOut
from utils.exceptions import PoolsDatabaseException


DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class AmenitiesQueries:
    def get_by_id(self, id: int):
        pass
    #return amenity out given an id
    #need pydantic model

    def get_all(self):
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(AmenityOut)) as cur:
                    cur.execute("SELECT * FROM amenities")
                    return cur.fetchall()
        except psycopg.Error as e:
            print(e)
            raise PoolsDatabaseException("Error getting all amenities")
