from fastapi import Depends, APIRouter, HTTPException
from models.amenity import AmenityOut
from queries.amenity_queries import AmenitiesQueries


router = APIRouter()


@router.get("/api/amenity", response_model=list[AmenityOut])
def get_all_amenities(
    amenity_queries: AmenitiesQueries = Depends()
    ):
    return amenity_queries.get_all()
