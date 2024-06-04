from pydantic import BaseModel


class PoolIn(BaseModel):
    """
    Creates a pool.
    """
    picture_url: str
    address: str
    description: str
    hourly_rate: int
    number_guests: int
    amenities_ids: list[int]


class PoolOutWithAmenityIds(PoolIn):
    """
    Get a pool
    """
    id: int
    poolowner_id: int


class PoolOut(BaseModel):
    """
    Get a pool
    """
    id: int
    poolowner_id: int
    picture_url: str
    address: str
    description: str
    hourly_rate: int
    number_guests: int


class PoolUpdate(BaseModel):
    id: int
    poolowner_id: int
    picture_url: str
    address: str
    description: str
    hourly_rate: int
    number_guests: int
