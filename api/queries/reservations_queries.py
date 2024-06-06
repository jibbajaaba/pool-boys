"""
Database Queries for Reservations
"""
import os
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from models.reservations import ReservationIn, ReservationOut
from utils.exceptions import ReservationDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class ReservationQueries:
    def create_reservation(
            self,
            new_reservation: ReservationIn,
            user_id: int,
    ) -> ReservationOut:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(ReservationOut)) as cur:
                cur.execute(
                    """
                    INSERT INTO reservations (
                        start_time,
                        end_time,
                        pool_id,
                        user_id
                    ) VALUES (
                        %s, %s, %s, %s
                    )
                    RETURNING *;
                    """,
                    [
                        new_reservation.start_time,
                        new_reservation.end_time,
                        new_reservation.pool_id,
                        user_id
                    ],
                )
                reservation = cur.fetchone()
                if not reservation:
                    raise ReservationDatabaseException(
                        "Could not create reservation"
                    )
                return reservation
