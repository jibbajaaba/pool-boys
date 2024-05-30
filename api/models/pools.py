from pydantic import BaseModel


class PoolIn(BaseModel):
    """
    Creates a pool.
    """

    picture_url: str
    address: str
    days_available: str
    description: str
    hourly_rate: int
    number_guests: int
    poolowner_id: int


class PoolOut(BaseModel):
    """
    Get a pool
    """
    id: int
    picture_url: str
    address: str
    days_available: str
    description: str
    hourly_rate: int
    number_guests: int
    poolowner_id: int
