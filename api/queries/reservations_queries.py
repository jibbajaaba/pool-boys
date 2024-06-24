"""
Database Queries for Reservations
"""
import os
from fastapi import HTTPException
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
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

    def get_all_reservations(self):
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(ReservationOut)) as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM reservations;
                    """
                )
                reservation = cur.fetchall()
                if not reservation:
                    raise HTTPException(
                            status_code=404, detail="No reservations found")
                return reservation

    def get_reservation_by_id(
            self,
            id: int,
            user_id
            ) -> Optional[ReservationOut]:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(ReservationOut)) as cur:
                cur.execute(
                    """
                    SELECT
                        *
                    FROM reservations
                    WHERE id = %s AND user_id = %s
                    """,
                    [id, user_id],
                )
                reservation = cur.fetchone()
                if not reservation:
                    return None
                return reservation

    def delete_reservation(self, id: int, user_id: int) -> ReservationOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                        DELETE FROM reservations
                        WHERE id = %s AND user_id = %s
                        """,
                    [id, user_id],
                )
            if not result:
                return {"success": False, "message": "reservation not found"}
            return True

    def get_reservation_by_pool_id(
            self,
            pool_id: int
            ) -> Optional[ReservationOut]:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(ReservationOut)) as cur:
                cur.execute(
                    """
                    SELECT
                        *
                    FROM reservations
                    WHERE pool_id = %s
                    """,
                    [pool_id],
                )
                reservation = cur.fetchall()
                if not reservation:
                    return None
                return reservation
