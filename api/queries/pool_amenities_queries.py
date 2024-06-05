import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class PoolAmenitiesQueries:
    def create_pool_amenity(self, pool_id: int, amenity_id: int):
        pass

    def get_by_pool_id_and_amenity_id(self, pool_id: int, amenity_id: int):
        pass

    def delete(self, pool_id: int, amenity_id: int):
        pass
