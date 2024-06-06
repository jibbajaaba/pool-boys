from pydantic import BaseModel
from datetime import datetime


class ReservationIn(BaseModel):
    """
    Create Reservation
    """
    pool_id: int
    start_time: datetime
    end_time: datetime


class ReservationOut(BaseModel):
    """
    get a Reservation
    """
    id: int
    start_time: datetime
    end_time: datetime
    pool_id: int
    user_id: int
