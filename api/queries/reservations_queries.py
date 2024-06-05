"""
Database Queries for Reservations
"""
import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.reservations import ReservationIn, ReservationOut
from utils.exceptions import PoolsDatabaseException, ReservationDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class ReservationQueries:
    def create_reservation(
            self,
            new_reservation: ReservationIn,
            reservation_id: int,
    ) -> ReservationOut:
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(ReservationOut)) as cur:
                    cur.execute(
                        """
                        INSERT INTO pools (
                            start_time,
                            end_time,
                            pool_id,
                            user_id,
                        ) VALUES (
                            %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            new_reservation.start_time,
                            new_reservation.end_time,
                            new_reservation.pool_id,
                            new_reservation.user_id,
                        ],
                    )
                    reservation = cur.fetchone()
                    if not reservation:
                        raise ReservationDatabaseException(
                            "Could not create reservation"
                        )
        except psycopg.Error:
            raise ReservationDatabaseException(
                "Could not create reservation"
            )
        return reservation
