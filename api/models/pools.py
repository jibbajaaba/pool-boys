from pydantic import BaseModel


class PoolIn(BaseModel):
    """
    Creates a pool.
    """

    picture_url: str
    address: str
    dates_available: str
    description: str
    hourly_rate: int
    number_guests: int
    poolowner_id: int


class PoolOut(PoolIn):
    """
    Get a pool
    """
    id: int
    picture_url: str
    address: str
    dates_available: str
    description: str
    hourly_rate: int
    number_guests: int
    poolowner_id: int
