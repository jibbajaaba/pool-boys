from pydantic import BaseModel
from datetime import datetime


class ReservationIn(BaseModel):
    """
    Create Reservation
    """
    start_time: datetime
    end_time: datetime
    pool_id: int
    user_id: int


class ReservationOut(BaseModel):
    """
    get a Reservation
    """
