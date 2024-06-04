from pydantic import BaseModel

class AmenityIn(BaseModel):
    name: str


class AmenityOut(BaseModel):
    id: int
    name: str
